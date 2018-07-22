package com.kk.apollo.biz.model.ticket;

import com.kk.apollo.biz.model.ticket.Ticket;

import java.util.Date;
import java.util.List;

public class Check {
    private Integer id;

    private Integer checkticketid;

    private Integer checkuserid;

    private Date checktime;

    private String checkresult;

    private String checkreason;

    private String checkuser;
    
    private List<Ticket> ticketList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCheckticketid() {
        return checkticketid;
    }

    public void setCheckticketid(Integer checkticketid) {
        this.checkticketid = checkticketid;
    }

    public Integer getCheckuserid() {
        return checkuserid;
    }

    public void setCheckuserid(Integer checkuserid) {
        this.checkuserid = checkuserid;
    }

    public Date getChecktime() {
        return checktime;
    }

    public void setChecktime(Date checktime) {
        this.checktime = checktime;
    }

    public String getCheckresult() {
        return checkresult;
    }

    public void setCheckresult(String checkresult) {
        this.checkresult = checkresult == null ? null : checkresult.trim();
    }

    public String getCheckreason() {
        return checkreason;
    }

    public void setCheckreason(String checkreason) {
        this.checkreason = checkreason == null ? null : checkreason.trim();
    }

    public String getCheckuser() {
        return checkuser;
    }

    public void setCheckuser(String checkuser) {
        this.checkuser = checkuser == null ? null : checkuser.trim();
    }

	public List<Ticket> getTicketList() {
		return ticketList;
	}

	public void setTicketList(List<Ticket> ticketList) {
		this.ticketList = ticketList;
	}

}