import * as Params from './params';
import * as Responses from './responses';

declare class Updates {
  /**
   * Constructor
   * @param token VK Point Token
   * @param userId VK User ID
   */
  constructor(token: string, userId: number);

  /**
   * Callback API options
   * @param options Start webhook params
   */
  start(options: Params.IUpdatesStartParams): Promise<void>;

  /**
   * @param callback Callback
   */
  onTransfer(callback: Function): void;
}

declare class API {
  /**
   * Constructor
   * @param token VK Point Token
   * @param userId VK User ID
   */
  constructor(token: string, userId: number);

  /**
   * @param method VK Point API method
   * @param params VK Point API parameters
   */
  call(method: string, params?: object): Promise<any>;

  /**
   * @param toId Target's ID
   * @param amount Amount of VK Points
   */
  sendPayment(toId: number, amount: number): Promise<Responses.ISendPaymentResponse>;

  /**
   * @param targetId Target's ID
   */
  getUserData(targetId: number): Promise<Responses.IGetUserDataResponse>;

  /**
   * @param count Amount of users
   * @param vip Is top vip?
   */
  getUsersTop(count?: number, vip?: boolean): Promise<Responses.IGetTopResponse | Responses.IGetVipTopResponse>;

  generateLink(amount?: number, fixation?: boolean): string;
}

declare class VKPoint {
  /**
   * Constructor
   * @param options VK Point params
   */
  constructor(options: Params.IVKPointParams);

  updates: Updates;

  api: API;
}

export default VKPoint;

export = VKPoint;
