const INITIAL_STATE = {
    account: {
        active: '',
        address_id: '',
        address_id_vpost: '',
        api_token: '',
        app: '',
        app_variant_id: '',
        config_confirm_id: '',
        customer_email: '',
        customer_full_name: '',
        customer_id_bank: '',
        customer_monitoring: '',
        customer_name_bank: '',
        customer_note: '',
        customer_number_bank: '',
        customer_phone: '',
        customer_phone_zalo: '',
        customer_shop_code: '',
        customer_shop_name: 'Đạt Nguyễn',
        group_debits: '',
        id: '',
        is_active: '',
        mua_bao_hiem: '',
        partner_redirect_errors: '',
        partner_redirect_id: '',
        partner_redirect_warehouse: '',
        policy: '',
        policy_id: '',
        policy_v2: '',
        response_code: '',
        sps_block: '',
        sps_password: '',
        sps_proxy: '',
        sps_token_login: '',
        sps_username: '',
        status: '',
        token: '',
        token_customer: '',
        ung_cod: '',
        user_color: '',
        user_ref: '',
        username: '',
        v2_session: '',
    },
    isAuthenticated: false
}

// const userReducer = () => ({
//     state: INITIAL_STATE,
// })

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_USER_LOGIN_SUCCESS':
            return {
                ...state, account: {
                    active: action.payload.data.active,
                    address_id: action.payload.data.address_id,
                    address_id_vpost: action.payload.data.address_id_vpost,
                    api_token: action.payload.data.api_token,
                    app: action.payload.data.app,
                    app_variant_id: action.payload.data.app_variant_id,
                    config_confirm_id: action.payload.data.config_confirm_id,
                    customer_email: action.payload.data.customer_email,
                    customer_full_name: action.payload.data.customer_full_name,
                    customer_id_bank: action.payload.data.customer_id_bank,
                    customer_monitoring: action.payload.data.customer_monitoring,
                    customer_name_bank: action.payload.data.customer_name_bank,
                    customer_note: action.payload.data.customer_note,
                    customer_number_bank: action.payload.data.customer_number_bank,
                    customer_phone: action.payload.data.customer_phone,
                    customer_phone_zalo: action.payload.data.customer_phone_zalo,
                    customer_shop_code: action.payload.data.customer_shop_code,
                    customer_shop_name: action.payload.data.customer_shop_name,
                    group_debits: action.payload.data.group_debits,
                    id: action.payload.data.id,
                    is_active: action.payload.data.is_active,
                    mua_bao_hiem: action.payload.data.mua_bao_hiem,
                    partner_redirect_errors: action.payload.data.partner_redirect_errors,
                    partner_redirect_id: action.payload.data.partner_redirect_id,
                    partner_redirect_warehouse: action.payload.data.partner_redirect_warehouse,
                    policy: action.payload.data.policy,
                    policy_id: action.payload.data.policy_id,
                    policy_v2: action.payload.data.policy_v2,
                    response_code: action.payload.data.response_code,
                    sps_block: action.payload.data.sps_block,
                    sps_password: action.payload.data.sps_password,
                    sps_proxy: action.payload.data.sps_proxy,
                    sps_token_login: action.payload.data.sps_token_login,
                    sps_username: action.payload.data.sps_username,
                    status: action.payload.data.status,
                    token: action.payload.data.token,
                    token_customer: action.payload.data.token_customer,
                    ung_cod: action.payload.data.ung_cod,
                    user_color: action.payload.data.user_color,
                    user_ref: action.payload.data.user_ref,
                    username: action.payload.data.username,
                    v2_session: action.payload.data.v2_session,
                },
                isAuthenticated: true
            }
        case 'USER_LOGOUT_SUCCESS':
            return {
                ...state, account: {
                    active: '',
                    address_id: '',
                    address_id_vpost: '',
                    api_token: '',
                    app: '',
                    app_variant_id: '',
                    config_confirm_id: '',
                    customer_email: '',
                    customer_full_name: '',
                    customer_id_bank: '',
                    customer_monitoring: '',
                    customer_name_bank: '',
                    customer_note: '',
                    customer_number_bank: '',
                    customer_phone: '',
                    customer_phone_zalo: '',
                    customer_shop_code: '',
                    customer_shop_name: 'Đạt Nguyễn',
                    group_debits: '',
                    id: '',
                    is_active: '',
                    mua_bao_hiem: '',
                    partner_redirect_errors: '',
                    partner_redirect_id: '',
                    partner_redirect_warehouse: '',
                    policy: '',
                    policy_id: '',
                    policy_v2: '',
                    response_code: '',
                    sps_block: '',
                    sps_password: '',
                    sps_proxy: '',
                    sps_token_login: '',
                    sps_username: '',
                    status: '',
                    token: '',
                    token_customer: '',
                    ung_cod: '',
                    user_color: '',
                    user_ref: '',
                    username: '',
                    v2_session: '',
                },
                isAuthenticated: false
            }

        default: return state;
    }
};


export default userReducer;