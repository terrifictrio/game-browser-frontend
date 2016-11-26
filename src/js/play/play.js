import m from 'mithril';
import ace from 'ace';

import WebSocketService from '../common/services/web-socket';
import { i18n } from '../common/services/i18n';

import Menu from './layout/menu';
import ErrorList from './error-list';

const Play = {
  editor: null
};

Play.vm = {
  init() {
    Play.vm.errors = [];
  }
};

Play.getRoutes = function getRoutes() {
  return {
    '/play': Play
  };
};

Play.controller = function controller() {
  Play.vm.init();

  /* if (!WebSocketService.isOpen()) {
    m.route('/server/login');
  }*/

  return {
    uploadCode() {

    },
    clearErrors() {
      Play.vm.errors = [];
    }
  };
};

Play.view = function view(ctrl) {
  return m('section', [
    m('.hero.is-fullheight.is-dark', [
      m('.hero-head', m('.container.is-marginless.is-fluid', Menu)),
      m('.hero-body.is-paddingless', m('.container.is-marginless.is-fluid', [
        m('.game-container.custom-text-centered', [
          m('canvas')
        ])
      ]))
    ]),
    m('.bottom-panel.container.is-marginless.is-fluid', [
      m('nav.nav.has-shadow',
        m('.container', [
          m('.nav-left', [
            m('a.nav-item.is-tab.is-active', i18n.t('play:Menu.Code Editor')),
            m('a.nav-item.is-tab', i18n.t('play:Menu.Live Status'))
          ])
        ])),
      m('.container.is-marginless.is-fluid', { style: { height: '250px' } }, [
        m('div', { style: { width: '350px' } }, [
          m('a.button.is-success.is-medium.custom-max-width.custom-edgy-border', {
            onclick: ctrl.uploadCode
          }, [
            m('span.icon',
              m('i.fa.fa-code')),
            m('span', i18n.t('play:Editor.Upload Code'))
          ]),
          m('a.button.is-danger.is-medium.custom-max-width.custom-edgy-border', {
            onclick: ctrl.clearErrors
          }, [
            m('span.icon',
              m('i.fa.fa-times')),
            m('span', i18n.t('play:Editor.Clear Errors'))
          ]),
          m.component(ErrorList, { errors: Play.vm.errors })
        ]),
        m('#editor', { style: { left: '350px' }, config: createEditor })
      ])
    ])
  ]);

  function createEditor() {
    Play.editor = ace.edit('editor');
  }
};

export default Play;
