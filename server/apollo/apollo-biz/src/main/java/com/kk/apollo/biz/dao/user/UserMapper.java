package com.kk.apollo.biz.dao.user;

import com.kk.apollo.biz.model.user.Unit;
import com.kk.apollo.biz.model.user.User;

import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User getUserByName(String username);

    List<Integer> fetchPassNoPassByUserId(int userId);

    Unit getUnitByUserId(Integer id);

    User fetchRolePermByUserId(int userId);
}