window.configUrl = {
	development:{
		API_URL: '/apis/gms',
    PERMISSION_HOST: '/pers/permission_service',
    LOGIN_URL: 'http://192.168.1.52:8011?code=sys_gms&jump=192.168.1.52:8091'
	},
	production:{
		API_URL: '/apis/gms',
    PERMISSION_HOST: '/pers/permission_service',
    LOGIN_URL: 'http://192.168.1.88:2087/?code=sys_gms&jump=192.168.1.88:2092'
	}
}