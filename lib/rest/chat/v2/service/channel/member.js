'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../base/deserialize');  /* jshint ignore:line */
var serialize = require(
    '../../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var MemberList;
var MemberPage;
var MemberInstance;
var MemberContext;

/* jshint ignore:start */
/**
 * @description Initialize the MemberList
 *
 * @param {Twilio.Chat.V2} version - Version of the resource
 * @param {string} serviceSid -
 *          The unique id of the Service this member belongs to.
 * @param {string} channelSid - The unique id of the Channel for this member.
 */
/* jshint ignore:end */
MemberList = function MemberList(version, serviceSid, channelSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext}
   */
  /* jshint ignore:end */
  function MemberListInstance(sid) {
    return MemberListInstance.get(sid);
  }

  MemberListInstance._version = version;
  // Path Solution
  MemberListInstance._solution = {serviceSid: serviceSid, channelSid: channelSid};
  MemberListInstance._uri = _.template(
    '/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Members' // jshint ignore:line
  )(MemberListInstance._solution);
  /* jshint ignore:start */
  /**
   * create a MemberInstance
   *
   * @param {object} opts - Options for request
   * @param {string} opts.identity -
   *          A unique string identifier for this User in this Service. See the access tokens docs for more details.
   * @param {string} [opts.roleSid] -
   *          The role to be assigned to this member. Defaults to the roles specified on the Service.
   * @param {number} [opts.lastConsumedMessageIndex] -
   *          Field used to specify the last consumed Message index for the Channel for this Member.  Should only be used when recreating a Member from a backup/separate source.
   * @param {Date} [opts.lastConsumptionTimestamp] -
   *          ISO8601 time indicating the last datetime the Member consumed a Message in the Channel.  Should only be used when recreating a Member from a backup/separate source
   * @param {Date} [opts.dateCreated] -
   *          The ISO8601 time specifying the datetime the Members should be set as being created.  Will be set to the current time by the Chat service if not specified.  Note that this should only be used in cases where a Member is being recreated from a backup/separate source
   * @param {Date} [opts.dateUpdated] -
   *          The ISO8601 time specifying the datetime the Member should be set as having been last updated.  Will be set to the null by the Chat service if not specified.  Note that this should only be used in cases where a Member is being recreated from a backup/separate source  and where a Member was previously updated.
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed MemberInstance
   */
  /* jshint ignore:end */
  MemberListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.identity)) {
      throw new Error('Required parameter "opts.identity" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'Identity': _.get(opts, 'identity'),
      'RoleSid': _.get(opts, 'roleSid'),
      'LastConsumedMessageIndex': _.get(opts, 'lastConsumedMessageIndex'),
      'LastConsumptionTimestamp': serialize.iso8601DateTime(_.get(opts, 'lastConsumptionTimestamp')),
      'DateCreated': serialize.iso8601DateTime(_.get(opts, 'dateCreated')),
      'DateUpdated': serialize.iso8601DateTime(_.get(opts, 'dateUpdated'))
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new MemberInstance(
        this._version,
        payload,
        this._solution.serviceSid,
        this._solution.channelSid,
        this._solution.sid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Streams MemberInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string|list} [opts.identity] -
   *          A unique string identifier for this User in this Service. See the access tokens docs for more details.
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  MemberListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * Lists MemberInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string|list} [opts.identity] -
   *          A unique string identifier for this User in this Service. See the access tokens docs for more details.
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MemberListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of MemberInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {object} [opts] - Options for request
   * @param {string|list} [opts.identity] -
   *          A unique string identifier for this User in this Service. See the access tokens docs for more details.
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MemberListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Identity': serialize.map(_.get(opts, 'identity'), function(e) { return e; }),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new MemberPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of MemberInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  MemberListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new MemberPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a member
   *
   * @param {string} sid - Key that uniquely defines the member to fetch.
   *
   * @returns {Twilio.Chat.V2.ServiceContext.ChannelContext.MemberContext}
   */
  /* jshint ignore:end */
  MemberListInstance.get = function get(sid) {
    return new MemberContext(this._version, this._solution.serviceSid, this._solution.channelSid, sid);
  };

  return MemberListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the MemberPage
 *
 * @param {V2} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {MemberSolution} solution - Path solution
 *
 * @returns MemberPage
 */
/* jshint ignore:end */
MemberPage = function MemberPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(MemberPage.prototype, Page.prototype);
MemberPage.prototype.constructor = MemberPage;

/* jshint ignore:start */
/**
 * Build an instance of MemberInstance
 *
 * @param {MemberPayload} payload - Payload response from the API
 *
 * @returns MemberInstance
 */
/* jshint ignore:end */
MemberPage.prototype.getInstance = function getInstance(payload) {
  return new MemberInstance(
    this._version,
    payload,
    this._solution.serviceSid,
    this._solution.channelSid
  );
};


/* jshint ignore:start */
/**
 * Initialize the MemberContext
 *
 * @property {string} sid -
 *          A 34 character string that uniquely identifies this resource.
 * @property {string} accountSid -
 *          The unique id of the Account responsible for this member.
 * @property {string} channelSid - The unique id of the Channel for this member.
 * @property {string} serviceSid -
 *          The unique id of the Service this member belongs to.
 * @property {string} identity -
 *          A unique string identifier for this User in this Service.
 * @property {Date} dateCreated - The date that this resource was created.
 * @property {Date} dateUpdated - The date that this resource was last updated.
 * @property {string} roleSid - The Role assigned to this member.
 * @property {number} lastConsumedMessageIndex -
 *          An Integer representing index of the last Message this Member has read within this Channel
 * @property {Date} lastConsumptionTimestamp -
 *          An ISO8601 based timestamp string representing the datetime of the last Message read event for this Member within this Channel
 * @property {string} url - An absolute URL for this member.
 *
 * @param {V2} version - Version of the resource
 * @param {MemberPayload} payload - The instance payload
 * @param {sid} serviceSid - The unique id of the Service this member belongs to.
 * @param {sid} channelSid - The unique id of the Channel for this member.
 * @param {sid_like} sid - Key that uniquely defines the member to fetch.
 */
/* jshint ignore:end */
MemberInstance = function MemberInstance(version, payload, serviceSid,
                                          channelSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.channelSid = payload.channel_sid; // jshint ignore:line
  this.serviceSid = payload.service_sid; // jshint ignore:line
  this.identity = payload.identity; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.roleSid = payload.role_sid; // jshint ignore:line
  this.lastConsumedMessageIndex = deserialize.integer(payload.last_consumed_message_index); // jshint ignore:line
  this.lastConsumptionTimestamp = deserialize.iso8601DateTime(payload.last_consumption_timestamp); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {serviceSid: serviceSid, channelSid: channelSid, sid: sid || this.sid, };
};

Object.defineProperty(MemberInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new MemberContext(
        this._version,
        this._solution.serviceSid,
        this._solution.channelSid,
        this._solution.sid
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a MemberInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a MemberInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * update a MemberInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.roleSid] - The role to be assigned to this member.
 * @param {number} [opts.lastConsumedMessageIndex] -
 *          Field used to specify the last consumed Message index for the Channel for this Member.
 * @param {Date} [opts.lastConsumptionTimestamp] -
 *          ISO8601 time indicating the last datetime the Member consumed a Message in the Channel.
 * @param {Date} [opts.dateCreated] -
 *          The ISO8601 time specifying the datetime the Members should be set as being created.
 * @param {Date} [opts.dateUpdated] -
 *          The ISO8601 time specifying the datetime the Member should be set as having been last updated.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the MemberInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
MemberInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};


/* jshint ignore:start */
/**
 * Initialize the MemberContext
 *
 * @param {V2} version - Version of the resource
 * @param {sid} serviceSid - Sid of the Service this member belongs to.
 * @param {sid_like} channelSid -
 *          Key that uniquely defines the channel this member belongs to.
 * @param {sid_like} sid - Key that uniquely defines the member to fetch.
 */
/* jshint ignore:end */
MemberContext = function MemberContext(version, serviceSid, channelSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {serviceSid: serviceSid, channelSid: channelSid, sid: sid, };
  this._uri = _.template(
    '/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Members/<%= sid %>' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a MemberInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new MemberInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.channelSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a MemberInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({uri: this._uri, method: 'DELETE'});

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * update a MemberInstance
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.roleSid] - The role to be assigned to this member.
 * @param {number} [opts.lastConsumedMessageIndex] -
 *          Field used to specify the last consumed Message index for the Channel for this Member.
 * @param {Date} [opts.lastConsumptionTimestamp] -
 *          ISO8601 time indicating the last datetime the Member consumed a Message in the Channel.
 * @param {Date} [opts.dateCreated] -
 *          The ISO8601 time specifying the datetime the Members should be set as being created.
 * @param {Date} [opts.dateUpdated] -
 *          The ISO8601 time specifying the datetime the Member should be set as having been last updated.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed MemberInstance
 */
/* jshint ignore:end */
MemberContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'RoleSid': _.get(opts, 'roleSid'),
    'LastConsumedMessageIndex': _.get(opts, 'lastConsumedMessageIndex'),
    'LastConsumptionTimestamp': serialize.iso8601DateTime(_.get(opts, 'lastConsumptionTimestamp')),
    'DateCreated': serialize.iso8601DateTime(_.get(opts, 'dateCreated')),
    'DateUpdated': serialize.iso8601DateTime(_.get(opts, 'dateUpdated'))
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new MemberInstance(
      this._version,
      payload,
      this._solution.serviceSid,
      this._solution.channelSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  MemberList: MemberList,
  MemberPage: MemberPage,
  MemberInstance: MemberInstance,
  MemberContext: MemberContext
};
