import m from 'mithril';

import Menu from './menu';
import IpField from './ip-field';
import ServerIp from './server-ip';

const Home = {
  controller() {
    return {
      commitIp(ip) {
        ServerIp.set(ip);

        m.route('/server');
      }
    };
  },
  view(ctrl) {
    return [Menu, m.component(IpField, { onsave: ctrl.commitIp })];
  }
};

export default Home;
