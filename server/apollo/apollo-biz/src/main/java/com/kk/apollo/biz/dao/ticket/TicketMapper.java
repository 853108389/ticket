package com.kk.apollo.biz.dao.ticket;

import com.kk.apollo.biz.model.ticket.Ticket;
import com.kk.apollo.biz.model.ticket.TicketCheck;
import com.kk.apollo.biz.model.ticket.TicketSum;

import java.util.List;

public interface TicketMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Ticket record);

    int insertSelective(Ticket record);

    Ticket selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Ticket record);

    int updateByPrimaryKey(Ticket record);

    Ticket findTicketByTnumber(String tnumber);

    int findTicketPass();

    int findTickeyNopass();

    List<TicketCheck> findByYears(String startYear, String endYear , int userId);

    TicketSum findSumByYear(String year , String userId);

    List<Ticket> findAllTickets();

    List<TicketCheck> findfetchPassDetail(int userId);

    List<TicketCheck> findfetchNoPassDetail(int userId);
}