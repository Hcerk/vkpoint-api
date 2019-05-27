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
  public start(options: Params.IUpdatesStartParams): Promise<void>;

  /**
   * @param callback Callback
   */
  public onTransfer(callback: Function): void;
}

declare class API {
  /**
   * Constructor
   * @param token VK Point Token
   * @param userId VK User ID
   */
  constructor(token: string, userId: number);

  /**
   * @param method VK Point API метод
   * @param params VK Point API параметры
   */
  public call(method: string, params?: object): Promise<any>;

  /**
   * @param toId ID получателя
   * @param amount Количество VK Points
   */
  public sendPayment(toId: number, amount: number): Promise<Responses.ISendPaymentResponse>;

  /**
   * @param targetId ID того, о ком надо получить данные
   */
  public getUserData(targetId: number): Promise<Responses.IGetUserDataResponse>;

  /**
   * @param count Количество пользователей для вывода
   * @param vip Является ли топ VIP?
   */
  public getUsersTop(count?: number, vip?: boolean): Promise<Responses.IGetTopResponse | Responses.IGetVipTopResponse>;

  /**
   * @param targetId ID пользователя для получения транзакций
   */
  public getTransactionHistory(targetId?: number): Promise<Responses.IGetTransactionHistoryResponse>;

  /**
   * @param amount - Количество VK Point
   * @param fixation - Является ли сумма VK Points фиксированной?
   */
  public generateLink(amount?: number, fixation?: boolean): string;
}

declare class VKPoint {
  public updates: Updates;

  public api: API;
  /**
   * Constructor
   * @param options VK Point params
   */
  constructor(options: Params.IVKPointParams);
}

export default VKPoint;

export = VKPoint;
