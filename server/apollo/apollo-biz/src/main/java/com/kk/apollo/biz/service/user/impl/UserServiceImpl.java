package com.kk.apollo.biz.service.user.impl;

import com.kk.apollo.biz.dao.user.UserMapper;
import com.kk.apollo.biz.model.shiro.Permission;
import com.kk.apollo.biz.model.shiro.Role;
import com.kk.apollo.biz.model.ticket.TicketSum;
import com.kk.apollo.biz.model.user.Unit;
import com.kk.apollo.biz.model.user.User;
import com.kk.apollo.biz.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/6/3.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Role> selectRoleByUserId(Integer id) {
        return null;
    }

    @Override
    public List<Permission> selectPermissionByUserId(Integer id) {
        return null;
    }

    @Override
    public User getUserByName(String username) {
        return userMapper.getUserByName(username);
    }

    @Override
    public List<Integer> fetchPassNoPassByUserId(int userId) {
        return userMapper.fetchPassNoPassByUserId(userId);
    }

    @Override
    public Unit getUnitByUserId(Integer id) {
        return userMapper.getUnitByUserId(id);
    }

    @Override
    public User fetchRolePermByUserId(int userId) {
        return userMapper.fetchRolePermByUserId(userId);
    }

    @Override
    public User fetchUserByUserId(int userId) {
        return userMapper.selectByPrimaryKey(userId);
    }

}
