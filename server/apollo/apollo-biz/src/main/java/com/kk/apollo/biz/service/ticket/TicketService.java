package com.kk.apollo.biz.service.ticket;

import com.kk.apollo.biz.model.ticket.Ticket;
import com.kk.apollo.biz.model.ticket.TicketCheck;
import com.kk.apollo.biz.model.ticket.TicketSum;

import java.util.List;

/**
 * Created by Administrator on 2017/4/15.
 */
public interface TicketService {

    List<Ticket> findAllTickets();

    public boolean firstChecked(String tnumber);

    public Ticket findTicketByTnumber(String tnumber);

    public void insetTicket(Ticket ticket);

    void updateTicket(Ticket findTicket);

    int findPass();

    int findnoPass();

    List<TicketCheck> findByYears(String startYear, String endYear , int userId);

    TicketSum findSumByYear(String year,String userId);


    List<TicketCheck> fetchPassDetail(int userId);

    List<TicketCheck> fetchNoPassDetail(int userId);

}
