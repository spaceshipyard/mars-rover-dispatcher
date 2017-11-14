import { connect } from 'react-redux';
import { PureComponent } from 'react';
import nipplejs from 'nipplejs';

class NippleJoystik extends PureComponent {
    componentDidMount(){




      const options = {
        zone: this.joystick,
        mode: 'static',
        color: 'cyan',
        position: {top: '274px', left: '157px'}
      };

      const manager = nipplejs.create(options);

      manager.on('start end', function(evt, data) {
        console.log(evt, data);
        //todo stop all on end
      }).on('move', function(evt, data) {
        console.log(evt, data);
        //todo direction set
      }).on('dir:up plain:up dir:left plain:left dir:down ' +
        'plain:down dir:right plain:right',
        function(evt, data) {
          console.log(evt, data);
          //todo stop all
        }
      ).on('pressure', function(evt, data) {
        console.log(evt, data);
        //todo set speed
      });

    }

    render() {
        return <div>
            <div ref={(node)=> this.joystick = node} id="nipple-joystick" />
        </div>;
    }
};

const connectToCammera = connect(
    ({ camera }) => ({ x: camera.x, y: camera.y }),
    (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } }) }));


export default connectToCammera(NippleJoystik);