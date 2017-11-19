import { connect } from 'react-redux';
import { PureComponent } from 'react';
import nipplejs from 'nipplejs';

class NippleJoystik extends PureComponent {
    componentDidMount(){

      const { onChange } = this.props;

      const options = {
        zone: this.joystick,
        mode: 'static',
        color: 'cyan',
        position: {top: '274px', left: '157px'}
      };

      const manager = nipplejs.create(options);

      manager.on('start end', function(evt, data) {
        console.log('stop all');
        onChange({ x:0, y:0 });
      }).on('move', function(evt, data) {
        let x = 0;
        let y = 0;
        let { force, direction: { angle: angle } } = data;

        if(force>2) {
          force = 2;
        }

        if(force<-2) {
          force = -2;
        }

        switch(angle) {
          case 'up':
            x = force;
            y = force;
            break;

          case 'left':
            x = force;
            break;

          case 'right':
            y = force;
            break;

          case 'down':
            x = -force;
            y = -force;
            break;
        }

        if(['up', 'left', 'right', 'down'].includes(angle)){
          onChange({ x, y });
        }

      }).on('dir:up plain:up dir:left plain:left dir:down ' +
        'plain:down dir:right plain:right',
        function(evt, data) {
          console.log('stop all');
          onChange({ x:0, y:0 });
        }
      ).on('pressure', function(evt, data) {
        //not used
      });

    }

    render() {
        return <div>
            <div ref={(node)=> this.joystick = node} id="nipple-joystick" />
        </div>;
    }
};

const connectToPlatform = connect(
  ({ platform:{ offset } }) => ({ x: offset.x, y: offset.y }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'platformMove', value: { x, y } }) }));

export default connectToPlatform(NippleJoystik);