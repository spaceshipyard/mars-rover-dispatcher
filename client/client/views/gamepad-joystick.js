import {connect} from 'react-redux';
import {Component} from 'react';
import { directAngleToPosition } from './utils';

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
                // const values = {x: -(controller.axes[1] * 2).toFixed(4), y: +(controller.axes[0]*2).toFixed(4)};

                // const force = Math.sqrt(Math.pow(values.x, 2) + Math.pow(values.y, 2));
                // const radian = values.y / force + Math.PI/4;
                // const x = force * Math.cos(radian);
                // const y = -force * Math.sin(radian);
                
                const upBtn = controller.buttons[12].pressed;
                const downBtn = controller.buttons[13].pressed;
                const leftBtn = controller.buttons[14].pressed;
                const rightBtn = controller.buttons[15].pressed;

                let movingDirection = 'none'

                upBtn && (movingDirection = 'up');
                downBtn && (movingDirection = 'down');
                leftBtn && (movingDirection = 'left');
                rightBtn && (movingDirection = 'right');

                const dirValues = directAngleToPosition(movingDirection);

                if (!previousValues || !(dirValues.x === previousValues.x && dirValues.y === previousValues.y)) {
                    console.log('values', dirValues);
                    onChange(dirValues);
                    previousValues = dirValues;
                }

                const prevCamera = this.props.camera;
                const newValues = {x: -(controller.axes[3] * 180 - 90).toFixed(4),
                                   y:  (controller.axes[2] * 180 + 90).toFixed(4)};



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