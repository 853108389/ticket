package com.kk.apollo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2017/6/11.
 */
@Controller
@RequestMapping("/setting")
public class SettingController {
    @RequestMapping("toPermissionSettings")
    public String toPermissionSettings() {
        return "permissionSettings";
    }

}
//http://localhost:8080/apollo/setting/toPermissionSettings.do