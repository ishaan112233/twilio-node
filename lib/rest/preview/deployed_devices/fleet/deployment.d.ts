/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */

import DeployedDevices = require('../../DeployedDevices');
import Page = require('../../../../base/Page');
import Response = require('../../../../http/response');
import { SerializableClass } from '../../../../interfaces';

/**
 * @description Initialize the DeploymentList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param version - Version of the resource
 * @param fleetSid - The unique identifier of the Fleet.
 */
declare function DeploymentList(version: DeployedDevices, fleetSid: string): DeploymentListInstance;

/**
 * Options to pass to update
 *
 * @property friendlyName - A human readable description for this Deployment.
 * @property syncServiceSid - The unique identifier of the Sync service instance.
 */
interface DeploymentInstanceUpdateOptions {
  friendlyName?: string;
  syncServiceSid?: string;
}

interface DeploymentListInstance {
  /**
   * @param sid - sid of instance
   */
  (sid: string): DeploymentContext;
  /**
   * create a DeploymentInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  create(opts?: DeploymentListInstanceCreateOptions, callback?: (error: Error | null, item: DeploymentInstance) => any): Promise<DeploymentInstance>;
  /**
   * Streams DeploymentInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param opts - Options for request
   * @param callback - Function to process each record
   */
  each(opts?: DeploymentListInstanceEachOptions, callback?: (item: DeploymentInstance, done: (err?: Error) => void) => void): void;
  /**
   * Constructs a deployment
   *
   * @param sid - A string that uniquely identifies the Deployment.
   */
  get(sid: string): DeploymentContext;
  /**
   * Retrieve a single target page of DeploymentInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param targetUrl - API-generated URL for the requested results page
   * @param callback - Callback to handle list of records
   */
  getPage(targetUrl?: string, callback?: (error: Error | null, items: DeploymentPage) => any): Promise<DeploymentPage>;
  /**
   * Lists DeploymentInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  list(opts?: DeploymentListInstanceOptions, callback?: (error: Error | null, items: DeploymentInstance[]) => any): Promise<DeploymentInstance[]>;
  /**
   * Retrieve a single page of DeploymentInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param opts - Options for request
   * @param callback - Callback to handle list of records
   */
  page(opts?: DeploymentListInstancePageOptions, callback?: (error: Error | null, items: DeploymentPage) => any): Promise<DeploymentPage>;
}

/**
 * Options to pass to create
 *
 * @property friendlyName - A human readable description for this Deployment.
 * @property syncServiceSid - The unique identifier of the Sync service instance.
 */
interface DeploymentListInstanceCreateOptions {
  friendlyName?: string;
  syncServiceSid?: string;
}

/**
 * Options to pass to each
 *
 * @property callback -
 *                         Function to process each record. If this and a positional
 *                         callback are passed, this one will be used
 * @property done - Function to be called upon completion of streaming
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         each() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no pageSize is defined but a limit is defined,
 *                         each() will attempt to read the limit with the most efficient
 *                         page size, i.e. min(limit, 1000)
 */
interface DeploymentListInstanceEachOptions {
  callback?: (item: DeploymentInstance, done: (err?: Error) => void) => void;
  done?: Function;
  limit?: number;
  pageSize?: number;
}

/**
 * Options to pass to list
 *
 * @property limit -
 *                         Upper limit for the number of records to return.
 *                         list() guarantees never to return more than limit.
 *                         Default is no limit
 * @property pageSize -
 *                         Number of records to fetch per request,
 *                         when not set will use the default value of 50 records.
 *                         If no page_size is defined but a limit is defined,
 *                         list() will attempt to read the limit with the most
 *                         efficient page size, i.e. min(limit, 1000)
 */
interface DeploymentListInstanceOptions {
  limit?: number;
  pageSize?: number;
}

/**
 * Options to pass to page
 *
 * @property pageNumber - Page Number, this value is simply for client state
 * @property pageSize - Number of records to return, defaults to 50
 * @property pageToken - PageToken provided by the API
 */
interface DeploymentListInstancePageOptions {
  pageNumber?: number;
  pageSize?: number;
  pageToken?: string;
}

interface DeploymentPayload extends DeploymentResource, Page.TwilioResponsePayload {
}

interface DeploymentResource {
  account_sid: string;
  date_created: Date;
  date_updated: Date;
  fleet_sid: string;
  friendly_name: string;
  sid: string;
  sync_service_sid: string;
  url: string;
}

interface DeploymentSolution {
  fleetSid?: string;
}


declare class DeploymentContext {
  /**
   * Initialize the DeploymentContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param fleetSid - The fleet_sid
   * @param sid - A string that uniquely identifies the Deployment.
   */
  constructor(version: DeployedDevices, fleetSid: string, sid: string);

  /**
   * fetch a DeploymentInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: DeploymentInstance) => any): Promise<DeploymentInstance>;
  /**
   * remove a DeploymentInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: DeploymentInstance) => any): void;
  /**
   * update a DeploymentInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts?: DeploymentInstanceUpdateOptions, callback?: (error: Error | null, items: DeploymentInstance) => any): Promise<DeploymentInstance>;
}


declare class DeploymentInstance extends SerializableClass {
  /**
   * Initialize the DeploymentContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @property sid - A string that uniquely identifies this Deployment.
   * @property url - URL of this Deployment.
   * @property friendlyName - A human readable description for this Deployment
   * @property fleetSid - The unique identifier of the Fleet.
   * @property accountSid - The unique SID that identifies this Account.
   * @property syncServiceSid - The unique identifier of the Sync service instance.
   * @property dateCreated - The date this Deployment was created.
   * @property dateUpdated - The date this Deployment was updated.
   *
   * @param version - Version of the resource
   * @param payload - The instance payload
   * @param fleetSid - The unique identifier of the Fleet.
   * @param sid - A string that uniquely identifies the Deployment.
   */
  constructor(version: DeployedDevices, payload: DeploymentPayload, fleetSid: string, sid: string);

  private _proxy: DeploymentContext;
  accountSid: string;
  dateCreated: Date;
  dateUpdated: Date;
  /**
   * fetch a DeploymentInstance
   *
   * @param callback - Callback to handle processed record
   */
  fetch(callback?: (error: Error | null, items: DeploymentInstance) => any): void;
  fleetSid: string;
  friendlyName: string;
  /**
   * remove a DeploymentInstance
   *
   * @param callback - Callback to handle processed record
   */
  remove(callback?: (error: Error | null, items: DeploymentInstance) => any): void;
  sid: string;
  syncServiceSid: string;
  /**
   * Produce a plain JSON object version of the DeploymentInstance for serialization.
   * Removes any circular references in the object.
   */
  toJSON(): any;
  /**
   * update a DeploymentInstance
   *
   * @param opts - Options for request
   * @param callback - Callback to handle processed record
   */
  update(opts?: DeploymentInstanceUpdateOptions, callback?: (error: Error | null, items: DeploymentInstance) => any): void;
  url: string;
}


declare class DeploymentPage extends Page<DeployedDevices, DeploymentPayload, DeploymentResource, DeploymentInstance> {
  /**
   * Initialize the DeploymentPagePLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
   *
   * @param version - Version of the resource
   * @param response - Response from the API
   * @param solution - Path solution
   */
  constructor(version: DeployedDevices, response: Response<string>, solution: DeploymentSolution);

  /**
   * Build an instance of DeploymentInstance
   *
   * @param payload - Payload response from the API
   */
  getInstance(payload: DeploymentPayload): DeploymentInstance;
}

export { DeploymentContext, DeploymentInstance, DeploymentList, DeploymentListInstance, DeploymentListInstanceCreateOptions, DeploymentListInstanceEachOptions, DeploymentListInstanceOptions, DeploymentListInstancePageOptions, DeploymentPage, DeploymentPayload, DeploymentResource, DeploymentSolution }
