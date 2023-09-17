const state = () => ({
    device_uuid: null,
    device_name: null,
    device_model: null,
    device_manufacturer: null,
    device_osversion: null,

    mobile_http_url: 'mobile.responder.one',
    mobile_http_auth: '/api/v1/app/login',
    mobile_ws_url: 'mobile.responder.one',
    mobile_ws_port: 443,
    mobile_ws_auth: '/api/v1/app/broadcasting/auth',
    mobile_ws_key: 'mobile.responder.one',

    mobile_ws_state: null,

    link_token: null,
    api_token: null,
    callsign: null,
    cad_prefix: null,
    org_id: null,

    location_allowed: null,
    app_foreground: true,
    modal_position: 0.55,
    centre_resource: true,

    maps_url: 'https://maps.responder.one',
    maps_token: 'abada1a2-7eae-419a-a65a-9e47eb00deb6',     // Skerric maps.responder.one token
    maps_default_location: {lat: '-34.9206945', lon: '138.5960546', zoom: 11},

    timezone: 'Australia/Sydney',

    schedule_statuses_available: [],
    flags_available: [],
    incident_closed_states: [],
});
 
const getters = {

    mobile_http_url(state) { return state.mobile_http_url; },
    mobile_http_auth(state) { return state.mobile_http_auth; },
    mobile_ws_url(state) { return state.mobile_ws_url; },
    mobile_ws_port(state) { return state.mobile_ws_port; },
    mobile_ws_auth(state) { return state.mobile_ws_auth; },
    mobile_ws_key(state) { return state.mobile_ws_key; },

    mobile_ws_state(state) { return state.mobile_ws_state; },
    
    cs_channel(state) { return 'cad_'+state.cad_prefix+'_org_'+state.org_id+'_cs_'+state.callsign; },
    org_channel(state) { return 'cad_'+state.cad_prefix+'_org_'+state.org_id; },

    link_token(state) { return state.link_token; },
    api_token(state) { return state.api_token; },
    callsign(state) { return state.callsign; },
    cad_prefix(state) { return state.cad_prefix; },
    org_id(state) { return state.org_id; },
    axios_headers(state) { return { headers: { Authorization: 'Bearer ' + state.api_token } } },
    
    location_allowed(state) { return state.location_allowed; },
    app_foreground(state) { return state.app_foreground; },
    modal_position(state) { return state.modal_position; },
    centre_resource(state) { return state.centre_resource; },

    maps_url(state) { return state.maps_url; },
    maps_token(state) { return state.maps_token; },
    maps_default_location(state) { return state.maps_default_location; },
    
    timezone(state) { return state.timezone; },

    schedule_statuses_available(state) { return state.schedule_statuses_available; },
    flags_available(state) { return state.flags_available; },
    incident_closed_states(state) { return state.incident_closed_states; },

	device_uuid(state) { return state.device_uuid; },
	device_name(state) { return state.device_name; },
	device_model(state) { return state.device_model; },
	device_manufacturer(state) { return state.device_manufacturer; },
	device_osversion(state) { return state.device_osversion; },

    // State checking used by websockets.js
    ws_ready(state) {
		if (state.api_token == null || 
			state.mobile_http_url == null ||
			state.mobile_ws_url == null ||
			state.mobile_ws_port == null ||
			state.mobile_ws_auth == null ||
			state.mobile_ws_key == null)
		{ 
            return false;
        } 
		else
		{ 
            return true;
        }
    },

    // State checking used by Pages
    init_state(state) {
        if (state.device_uuid == null)
        {
            return 'init';
        }
        else if ((state.api_token == null ||
             state.callsign == null ||
             state.cad_prefix == null ||
             state.org_id == null) && 
             state.device_uuid != null)
        {
            return 'login';
        }
        else if (state.api_token != null &&
                 state.mobile_http_url != null &&
                 state.mobile_ws_url != null &&
                 state.mobile_ws_port != null &&
                 state.mobile_ws_auth != null &&
                 state.mobile_ws_key != null)
        {
            return 'home';
        }
        else
        {
            return false;
        }
    },
};
 
const actions = {};
 
const mutations = {
	mobile_ws_state(state, payload) { state.mobile_ws_state = payload; },

    device_uuid(state, payload) { state.device_uuid = payload; },
    device_name(state, payload) { state.device_name = payload; },
    device_model(state, payload) { state.device_model = payload; },
    device_manufacturer(state, payload) { state.device_manufacturer = payload; },
    device_osversion(state, payload) { state.device_osversion = payload; },
    
    app_foreground(state, payload) { state.app_foreground = payload; },
    modal_position(state, payload) { state.modal_position = payload; },

    timezone(state, payload) { state.timezone = payload; },
    
    schedule_statuses_available(state, payload) { state.schedule_statuses_available = payload; },
    flags_available(state, payload) { state.flags_available = payload; },
    incident_closed_states(state, payload) { state.incident_closed_states = payload; },

    location_allowed(state, payload) {
        if (payload != null) { payload = payload.toString(); }
        state.location_allowed = payload;
        this.$storage.set({ key: 'config/location_allowed', value: payload });
        console.log('Setting local storage: config/location_allowed');
    },

        location_allowed_restored(state, payload) {
            if (payload != null) { payload = payload.toString(); }
            state.location_allowed = payload;
            console.log('Restoring local storage: config/location_allowed');
        },

    centre_resource(state, payload) {
        if (payload != null) { payload = payload.toString(); }
        state.centre_resource = payload;
        this.$storage.set({ key: 'config/centre_resource', value: payload });
        console.log('Setting local storage: config/centre_resource');
    },

        centre_resource_restored(state, payload) {
            if (payload != null) { payload = payload.toString(); }
            state.centre_resource = payload;
            console.log('Restoring local storage: config/centre_resource');
        },

    callsign(state, payload) { 
        state.callsign = payload;
        this.$storage.set({ key: 'config/callsign', value: payload });
        console.log('Setting local storage: config/callsign');
    },

        callsign_restored(state, payload) { 
            state.callsign = payload;
            console.log('Restoring local storage: config/callsign');
        },
    
    cad_prefix(state, payload) { 
        state.cad_prefix = payload;
        this.$storage.set({ key: 'config/cad_prefix', value: payload });
        console.log('Setting local storage: config/cad_prefix');
    },

        cad_prefix_restored(state, payload) { 
            state.cad_prefix = payload;
            console.log('Restoring local storage: config/cad_prefix');
        },
    
    org_id(state, payload) { 
        if (payload != null) { payload = payload.toString(); }
        state.org_id = payload;
        this.$storage.set({ key: 'config/org_id', value: payload }); 
        console.log('Setting local storage: config/org_id');
    },

        org_id_restored(state, payload) { 
            if (payload != null) { payload = payload.toString(); }
            state.org_id = payload;
            console.log('Restoring local storage: config/org_id');
        },

    link_token(state, payload) {
        state.link_token = payload;
        this.$storage.set({ key: 'config/link_token', value: payload }); 
        console.log('Setting local storage: config/link_token');
    },

        link_token_restored(state, payload) {
            state.link_token = payload;
            console.log('Restoring local storage: config/link_token');
        },

    api_token(state, payload) {
        state.api_token = payload;
        this.$storage.set({ key: 'config/api_token', value: payload }); 
        console.log('Setting local storage: config/api_token');
    },

        api_token_restored(state, payload) {
            state.api_token = payload;
            console.log('Restoring local storage: config/api_token');
        },
};
 
export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}