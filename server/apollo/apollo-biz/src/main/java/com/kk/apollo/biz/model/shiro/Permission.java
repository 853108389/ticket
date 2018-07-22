package com.kk.apollo.biz.model.shiro;

public class Permission {
    private Integer id;

    private String pname;

    private String description;

    private String path;

    private String memu;

    private Integer plevel;

    private Integer parentid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname == null ? null : pname.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }

    public String getMemu() {
        return memu;
    }

    public void setMemu(String memu) {
        this.memu = memu == null ? null : memu.trim();
    }


    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public Integer getPlevel() {
        return plevel;
    }

    public void setPlevel(Integer plevel) {
        this.plevel = plevel;
    }
}