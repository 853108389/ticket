package com.kk.apollo.biz.model.ticket;

public class Ticket {
    private Integer id;

    private String tcode;

    private String tnumber;

    private String tmoney;

    private String tdate;

    private String tcheckcode;

    private String tchecked;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTcode() {
        return tcode;
    }

    public void setTcode(String tcode) {
        this.tcode = tcode == null ? null : tcode.trim();
    }

    public String getTnumber() {
        return tnumber;
    }

    public void setTnumber(String tnumber) {
        this.tnumber = tnumber == null ? null : tnumber.trim();
    }

    public String getTmoney() {
        return tmoney;
    }

    public void setTmoney(String tmoney) {
        this.tmoney = tmoney == null ? null : tmoney.trim();
    }

    public String getTdate() {
        return tdate;
    }

    public void setTdate(String tdate) {
        this.tdate = tdate == null ? null : tdate.trim();
    }

    public String getTcheckcode() {
        return tcheckcode;
    }

    public void setTcheckcode(String tcheckcode) {
        this.tcheckcode = tcheckcode == null ? null : tcheckcode.trim();
    }

    public String getTchecked() {
        return tchecked;
    }

    public void setTchecked(String tchecked) {
        this.tchecked = tchecked;
    }
}