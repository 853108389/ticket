package com.kk.apollo.biz.model.ticket;

import java.util.Date;

/**
 * Created by Administrator on 2017/6/4.
 */
public class TicketCheck {
    private String checktimeFormat;

    private Date checktime;

    private String checkresult;

    private String checkreason;

    private String checkuser;

    private String tcode;

    private String tnumber;

    private String tmoney;

    private String tdate;

    private String tcheckcode;


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
        this.checkresult = checkresult;
    }

    public String getCheckreason() {
        return checkreason;
    }

    public void setCheckreason(String checkreason) {
        this.checkreason = checkreason;
    }

    public String getCheckuser() {
        return checkuser;
    }

    public void setCheckuser(String checkuser) {
        this.checkuser = checkuser;
    }

    public String getTcode() {
        return tcode;
    }

    public void setTcode(String tcode) {
        this.tcode = tcode;
    }

    public String getTnumber() {
        return tnumber;
    }

    public void setTnumber(String tnumber) {
        this.tnumber = tnumber;
    }

    public String getTmoney() {
        return tmoney;
    }

    public void setTmoney(String tmoney) {
        this.tmoney = tmoney;
    }

    public String getTdate() {
        return tdate;
    }

    public void setTdate(String tdate) {
        this.tdate = tdate;
    }

    public String getTcheckcode() {
        return tcheckcode;
    }

    public void setTcheckcode(String tcheckcode) {
        this.tcheckcode = tcheckcode;
    }

    public String getChecktimeFormat() {
        return checktimeFormat;
    }

    public void setChecktimeFormat(String checktimeFormat) {
        this.checktimeFormat = checktimeFormat;
    }
}
