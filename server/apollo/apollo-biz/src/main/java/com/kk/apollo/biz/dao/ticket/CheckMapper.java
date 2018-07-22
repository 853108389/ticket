package com.kk.apollo.biz.dao.ticket;

import com.kk.apollo.biz.model.ticket.Check;

public interface CheckMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Check record);

    int insertSelective(Check record);

    Check selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Check record);

    int updateByPrimaryKey(Check record);
}