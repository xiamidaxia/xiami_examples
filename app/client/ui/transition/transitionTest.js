module = window.module
describe('ui - transition', function() {
    var $transition, $timeout;

    beforeEach(module('ui.transition'));

    beforeEach(inject(function(_$transition_, _$timeout_) {
        $transition = _$transition_;
        $timeout = _$timeout_;
    }));

    it('returns our custom promise', function() {
        var element = angular.element('<div></div>');
        var promise = $transition(element, '');
        promise.then.should.be.a('function')
        promise.cancel.should.be.a('function')
    });

    it('changes the css if passed a string', function(done) {
        var element = angular.element('<div></div>');
        sinon.spy(element, 'addClass');
        $transition(element, 'triggerClass');
        $timeout.flush();
        element.addClass.should.be.calledOnce
        done()
    });

    it('changes the style if passed an object', function() {
        var element = angular.element('<div></div>');
        var triggerStyle = { height: '11px' };
        sinon.spy(element, 'css');
        $transition(element, triggerStyle);
        $timeout.flush();
        element.css.should.be.calledWith(triggerStyle)
    });

    it('calls the function if passed', function() {
        var element = angular.element('<div></div>');
        var triggerFunction = sinon.spy();
        $transition(element, triggerFunction);
        $timeout.flush();
        triggerFunction.should.be.calledWith(element)
    });

    describe('transitionEnd event', function() {
        var element, triggerTransitionEnd;

        beforeEach(function() {
            element = angular.element('<div></div>');

            // Mock up the element.bind method
            sinon.stub(element, "bind", function(element, handler) {
                // Store the handler to be used to simulate the end of the transition later
                triggerTransitionEnd = handler;
            })
            // Mock up the element.unbind method
            sinon.stub(element, 'unbind');
        });

        it('transitionEndEventName should be a string ending with transitionend', function() {
            $transition.transitionEndEventName.should.match(/transitionend$/i);
        });

        it('animationEndEventName should be a string ending with animationend', function() {
            $transition.animationEndEventName.should.match(/animationend$/i);
        });

        it('binds a transitionEnd handler to the element', function() {
            $transition(element, '');
            element.bind.should.be.calledWithMatch($transition.transitionEndEventName, sinon.match.func);
        });

        it('binds an animationEnd handler to the element if option is given', function() {
            $transition(element, '', {animation: true});
            element.bind.should.be.calledWithMatch($transition.animationEndEventName, sinon.match.func);
        });

        it('resolves the promise when the transitionEnd is triggered', function() {
            var resolutionHandler = sinon.spy()

            // Run the transition
            $transition(element, '').then(resolutionHandler);

            // Simulate the end of transition event
            triggerTransitionEnd();
            $timeout.flush();

            resolutionHandler.should.be.calledWith(element)
        });

        it('rejects the promise if transition is cancelled', function() {
            var rejectionHandler = sinon.spy()

            var promise = $transition(element, '');
            promise.then(null, rejectionHandler);

            promise.cancel();
            inject(function($rootScope) {
                $rootScope.$digest()
            });
            rejectionHandler.should.have.been.calledWithMatch(sinon.match.string);
            element.unbind.should.have.been.calledWithMatch($transition.transitionEndEventName, sinon.match.func)
        });
    });
});

