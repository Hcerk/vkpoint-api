interface IGetTopUserResponse {
  id: string;

  user_id: string;

  photo: string;

  first_name: string;

  last_name: string;

  point: number;

  balance: number;

  balance_set: string;

  verified: string;
}

interface IGetVipTopUserResponse {
  id: string;

  user_id: string;

  photo: string;

  first_name: string;

  last_name: string;

  datetime: string;

  comment: string;

  verified: string;
}

interface IGetTransactionHistoryUserResponse {
  id: string;

  first_name: string;

  last_name: string;

  photo: string;

  datetime: number;

  info: {
    type: string;

    type_store: string;

    point: number;

    user_id: string;

    datetime: number;
  }
}

export interface IGetTopResponse {
  response: {
    count_point: number;

    count_online: string;

    items: Array<IGetTopUserResponse>;
  };
}

export interface IGetVipTopResponse {
  response: {
    items: Array<IGetVipTopUserResponse>;
  };
}

export interface IGetUserDataResponse {
  response: {
    id: string;

    user_id: string;

    first_name: string;

    last_name: string;

    photo: string;

    myning: string;

    user_agent: string;

    ban: string;

    reason_ban: string;

    bot: string;

    admin: string;

    verified: string;

    point: number;

    balance: number;

    balance_set: string;

    click: string;

    click_count: string;

    summTimeSpeed: string;

    summTimeSpeed_count: string;

    summTimeZhuk: string;

    summTimeZhuk_count: string;

    summTimeServer: string;

    summTimeServer_count: string;

    summTimeGeympad: string;

    summTimeGeympad_count: string;

    summTimePlata: string;

    summTimePlata_count: string;

    summTimeProces: string;

    summTimeProces_count: string;

    date_visit: number;
  };
}

export interface ISendPaymentResponse {
  response: {
    user_id: string;

    amount: number;

    user_id_to: string;
  };
}

export interface IGetTransactionHistoryResponse {
  response: {
    count_day: number;

    items: Array<IGetTransactionHistoryUserResponse>
  };
}
