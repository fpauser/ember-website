import EmberRouter from '@ember/routing/router';
import config from './config/environment';

import { inject as service } from '@ember/service';

const hostname = "www.emberjs.com";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  navbar: service(),
  metrics: service(),
  fastboot: service(),

  init() {
    this._super(...arguments);

    // this is constant for this app and is only used to identify page views in the GA dashboard
    const { page, title = "unknown" } = this;

    this.on("routeDidChange", () => {
      this.navbar.closePopupMenu();
      this._trackPage(page, title);
    });
  },

  _trackPage(page, title) {
    if (this.fastboot.isFastBoot) {
      return;
    }

    this.metrics.trackPage({ page, title, hostname });
  }
});

Router.map(function() {
  this.route('blog', function() {});
  this.route('community', function() {
    this.route('meetups', function() {
      this.route('assets');
    });
    this.route('meetups-getting-started');
  });
  this.route('ember-users');
  this.route('guidelines');
  this.route('learn', function() {
    this.route('examples');
  });
  this.route('about', function() {
    this.route('legal');
  });
  this.route('logos');
  this.route('releases', function() {
    this.route('release');
    this.route('beta');
    this.route('canary');
  });
  this.route('security');
  this.route('sponsors');
  this.route('team');

  this.route('mascots', function() {
    this.route('commission-sent');
    this.route('commission');
    this.route('faq');
    this.route('payment-sent');
    this.route('payment');
  });
  this.route('statusboard');
  this.route('ember-community-survey-2016');
  this.route('ember-community-survey-2017');
  this.route('ember-community-survey-2018');
  this.route('ember-community-survey-2019');

  this.route('editions', function() {
    this.route('octane');
  });
});

export default Router;
