package com.kk.apollo.biz.service.user;

import com.kk.apollo.biz.model.shiro.Permission;
import com.kk.apollo.biz.model.shiro.Role;
import com.kk.apollo.biz.model.user.Unit;
import com.kk.apollo.biz.model.user.User;

import java.util.List;

/**
 * Created by Administrator on 2017/6/3.
 */
public interface UserService {
    List<Role> selectRoleByUserId(Integer id);

    List<Permission> selectPermissionByUserId(Integer id);

    User getUserByName(String username);

    List<Integer> fetchPassNoPassByUserId(int userId);

    Unit getUnitByUserId(Integer id);

    User fetchRolePermByUserId(int i);

    User fetchUserByUserId(int i);
}
