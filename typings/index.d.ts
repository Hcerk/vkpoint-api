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
   * @param method VK Point API метод
   * @param params VK Point API параметры
   */
  call(method: string, params?: object): Promise<any>;

  /**
   * @param toId ID получателя
   * @param amount Количество VK Points
   */
  sendPayment(toId: number, amount: number): Promise<Responses.ISendPaymentResponse>;

  /**
   * @param targetId ID того, о ком надо получить данные
   */
  getUserData(targetId: number): Promise<Responses.IGetUserDataResponse>;

  /**
   * @param count Количество пользователей для вывода
   * @param vip Является ли топ VIP?
   */
  getUsersTop(count?: number, vip?: boolean): Promise<Responses.IGetTopResponse | Responses.IGetVipTopResponse>;

  /**
   * @param targetId ID пользователя для получения транзакций
   */
  getTransactionHistory(targetId?: number): Promise<Responses.IGetTransactionHistoryResponse>;

  /**
   * @param amount - Количество VK Point
   * @param fixation - Является ли сумма VK Points фиксированной?
   */
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
