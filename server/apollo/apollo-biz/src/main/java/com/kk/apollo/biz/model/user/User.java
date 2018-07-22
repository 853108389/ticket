package com.kk.apollo.biz.model.user;

import com.kk.apollo.biz.model.shiro.Role;
import com.kk.apollo.biz.model.ticket.Check;

import java.util.List;

public class User {
    private Integer id;

    private Integer unitid;

    private String truename;

    private String password;

    private String loginname;
    /**
     * User : Check 1 : n
     */
    private List<Check> checkList;
    
    private List<Role> roleList;

    private Unit unit;
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUnitid() {
        return unitid;
    }

    public void setUnitid(Integer unitid) {
        this.unitid = unitid;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getLoginname() {
        return loginname;
    }

    public void setLoginname(String loginname) {
        this.loginname = loginname == null ? null : loginname.trim();
    }

	public List<Check> getCheckList() {
		return checkList;
	}

	public void setCheckList(List<Check> checkList) {
		this.checkList = checkList;
	}

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

    public String getTruename() {
        return truename;
    }

    public void setTruename(String truename) {
        this.truename = truename == null ? null : truename.trim();
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
}