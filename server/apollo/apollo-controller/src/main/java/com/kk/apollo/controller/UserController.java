package com.kk.apollo.controller;

import com.kk.apollo.biz.model.shiro.Role;
import com.kk.apollo.biz.model.user.Unit;
import com.kk.apollo.biz.model.user.User;
import com.kk.apollo.biz.service.user.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/3.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private HttpSession session;
    @Autowired
    private UserService userService;

    @RequestMapping("login")
    public @ResponseBody
    String login(@RequestBody Map<String, String> map) {
        String code = "1";//1为登录成功
        String username = "";
        String password = "";
        if (map.containsKey("username")) {
            username = map.get("username");
        }
        if (map.containsKey("password")) {
            password = map.get("password");
        }

        try {
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            Subject currentUser = SecurityUtils.getSubject();
            User user = userService.getUserByName(username);
            Integer id = user.getId();
            Unit unit = userService.getUnitByUserId(user.getUnitid());
            currentUser.login(token);
            List<Role> roleList = user.getRoleList();
            return code + "," + username + "," + id + "," + unit.getUname();//状态码,用户名,用户id
        } catch (Exception e) {
            return "0"; //0为失败
        }
    }

    @RequestMapping("logout")
    public String logout() {
        SecurityUtils.getSubject().logout();
        return "";
    }

    /**
     * fetch
     * 查询通过未通过
     *
     * @return
     */
    @RequestMapping("fetchPassNoPassByUserId")
    public @ResponseBody
    List<Integer> fetchPassNoPassByUserId(@RequestBody Map<String, String> map) {
        String userId = null;
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if(userId!=null){
            return userService.fetchPassNoPassByUserId(Integer.parseInt(userId));
        }
       return null;
    }

    @RequestMapping("fetchRolePermByUserId")
    public @ResponseBody
    User fetchRolePermByUserId(@RequestBody Map<String, String> map) {
        String userId = null;
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if(userId!=null){
            User user = userService.fetchRolePermByUserId(Integer.parseInt(userId));
            return user;
        }
       return null;
    }

    @RequestMapping("fetchUserByUserId")
    public @ResponseBody
    User fetchUserByUserId(@RequestBody Map<String, String> map) {
        String userId = null;
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if(userId!=null){
            User user = userService.fetchUserByUserId(Integer.parseInt(userId));
            Unit unit = userService.getUnitByUserId(Integer.parseInt(userId));
            user.setUnit(unit);
            return user;
        }
       return null;
    }

    @RequestMapping("fetchUnitByUserId")
    public @ResponseBody
    Unit getUnitByUserId(@RequestBody Map<String, String> map) {
        String userId = null;
        if (map.containsKey("userId")) {
            userId = map.get("userId");
        }
        if(userId!=null){
            Unit unit = userService.getUnitByUserId(Integer.parseInt(userId));
            return unit;
        }
        return null;
    }

}
