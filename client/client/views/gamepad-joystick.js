import {connect} from 'react-redux';
import {Component} from 'react';


class GamepadJoystik extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {

        const {onChange} = this.props;
        let previousValues;


        var haveEvents = 'ongamepadconnected' in window;
        var controllers = [];

        function connecthandler(e) {
            addgamepad(e.gamepad);
        }

        function addgamepad(gamepad) {
            controllers[gamepad.index] = gamepad;
            console.log(gamepad);
            requestAnimationFrame(updateStatus);
        }

        function disconnecthandler(e) {
            removegamepad(e.gamepad);
        }

        const removegamepad = (gamepad) => {
            delete controllers[gamepad.index];
            this.setState({ controllerIds: controllers.map( _ => _.id ) });
        };

        const updateStatus = () => {
            if (!haveEvents) {
                scangamepads();
            }

            var i = 0;
            var j;

            for (j in controllers) {
                var controller = controllers[j];

                for (i = 0; i < controller.buttons.length; i++) {
                    var val = controller.buttons[i];
                    var pressed = val == 1.0;
                    if (typeof(val) == "object") {
                        pressed = val.pressed;
                        val = val.value;
                    }
                }

                // for (i = 0; i < controller.axes.length; i++) {
                //     console.log(i, controller.axes[i].toFixed(4));
                // }
                const values = {x: +(controller.axes[1]*2).toFixed(4), y: +(controller.axes[3]*2).toFixed(4)};

                if (!previousValues || !(values.x === previousValues.x && values.y === previousValues.y)) {
                    console.log('values', values);
                    onChange(values);
                    previousValues = values;
                }
                const upBtn = controller.buttons[4].pressed;
                const downBtn = controller.buttons[6].pressed;
                const leftBtn = controller.buttons[5].pressed;
                const rightBtn = controller.buttons[7].pressed;
                const prevCamera = this.props.camera;
                let camX = prevCamera.x;
                let camY = prevCamera.y;
                const delta = 0.3;
                if (upBtn) {
                    camY += delta;
                }
                if (downBtn) {
                    camY -= delta;
                }

                if (leftBtn) {
                    camX -= delta;
                }

                if (rightBtn) {
                    camX += delta;
                }
                const newValues = {x: camX, y: camY};
                if (!(newValues.x === prevCamera.x && newValues.y === prevCamera.y)) {
                    this.props.onChangeCamPosition(newValues);
                }
            }

            requestAnimationFrame(updateStatus);
        }

        const scangamepads = () => {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
            for (var i = 0; i < gamepads.length; i++) {
                if (gamepads[i]) {
                    if (gamepads[i].index in controllers) {
                        controllers[gamepads[i].index] = gamepads[i];
                    } else {
                        addgamepad(gamepads[i]);
                    }
                }
            }
            this.setState({ controllerIds: controllers.map( _ => _.id ) });
        }

        this.connecthandler = connecthandler;
        this.disconnecthandler = disconnecthandler;

        window.addEventListener("gamepadconnected", this.connecthandler);
        window.addEventListener("gamepaddisconnected", this.disconnecthandler);

        if (!haveEvents) {
            this.intervalId = setInterval(scangamepads, 500);
        }
    }

    componentWillUnmount() {
        if (!this.intervalId) {
            clearInterval(this.intervalId);
        }

        window.removeEventListener("gamepadconnected", this.connecthandler);
        window.removeEventListener("gamepaddisconnected", this.disconnecthandler);

    }

    render() {
        return <div>
            <span>gamepad: </span>
            <span>{(this.state.controllerIds && this.state.controllerIds.join(', ')) || 'no gamepad'}</span>
        </div>;
    }
}
;

const connectToPlatform = connect(
    ({platform:{offset}, camera}) => ({x: offset.x, y: offset.y, camera}),
    (dispatch) => ({
        onChange: ({x, y}) => dispatch({type: 'platformMove', value: {x, y}}),
        onChangeCamPosition: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } })
    })
);

export default connectToPlatform(GamepadJoystik);