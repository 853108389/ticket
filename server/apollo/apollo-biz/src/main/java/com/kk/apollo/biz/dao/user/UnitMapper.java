package com.kk.apollo.biz.dao.user;

import com.kk.apollo.biz.model.user.Unit;

public interface UnitMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Unit record);

    int insertSelective(Unit record);

    Unit selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Unit record);

    int updateByPrimaryKey(Unit record);
}