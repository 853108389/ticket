package com.kk.apollo.biz.service.ticket.impl;

import com.kk.apollo.biz.dao.ticket.TicketMapper;
import com.kk.apollo.biz.model.ticket.Ticket;
import com.kk.apollo.biz.model.ticket.TicketCheck;
import com.kk.apollo.biz.model.ticket.TicketSum;
import com.kk.apollo.biz.service.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/4/15.
 */
@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    TicketMapper ticketMapper;

    @Override
    public List<Ticket> findAllTickets() {
        return ticketMapper.findAllTickets();
    }

    @Override
public boolean firstChecked(String tnumber) {
    Ticket ticket = findTicketByTnumber(tnumber);
    if (ticket == null) {
        return true;
    }
    return false;
}

    @Override
    public Ticket findTicketByTnumber(String tnumber) {
        return ticketMapper.findTicketByTnumber(tnumber);
    }

    @Override
    public void insetTicket(Ticket ticket) {
        ticketMapper.insert(ticket);
    }

    @Override
    public void updateTicket(Ticket findTicket) {
        ticketMapper.updateByPrimaryKey(findTicket);
    }

    @Override
    public int findPass() {
        return  ticketMapper.findTicketPass();
    }

    @Override
    public int findnoPass() {
        return ticketMapper.findTickeyNopass();
    }

    @Override
    public List<TicketCheck> findByYears(String startYear, String endYear , int userId) {
        return ticketMapper.findByYears(startYear,endYear , userId);
    }

    @Override
    public TicketSum findSumByYear(String year , String userId) {
        return ticketMapper.findSumByYear(year , userId);
    }

    @Override
    public List<TicketCheck> fetchPassDetail(int userId) {
        return ticketMapper.findfetchPassDetail(userId);
    }
    @Override
    public List<TicketCheck> fetchNoPassDetail(int userId) {
        return ticketMapper.findfetchNoPassDetail(userId);
    }


}
