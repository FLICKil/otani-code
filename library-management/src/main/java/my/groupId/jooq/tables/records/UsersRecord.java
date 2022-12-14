/*
 * This file is generated by jOOQ.
 */
package my.groupId.jooq.tables.records;


import java.time.LocalDateTime;

import my.groupId.jooq.tables.Users;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record9;
import org.jooq.Row9;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class UsersRecord extends UpdatableRecordImpl<UsersRecord> implements Record9<Long, String, String, String, Byte, LocalDateTime, LocalDateTime, Long, Long> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>library.users.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>library.users.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>library.users.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>library.users.name</code>.
     */
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>library.users.email</code>.
     */
    public void setEmail(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>library.users.email</code>.
     */
    public String getEmail() {
        return (String) get(2);
    }

    /**
     * Setter for <code>library.users.password</code>.
     */
    public void setPassword(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>library.users.password</code>.
     */
    public String getPassword() {
        return (String) get(3);
    }

    /**
     * Setter for <code>library.users.active</code>.
     */
    public void setActive(Byte value) {
        set(4, value);
    }

    /**
     * Getter for <code>library.users.active</code>.
     */
    public Byte getActive() {
        return (Byte) get(4);
    }

    /**
     * Setter for <code>library.users.createdAt</code>.
     */
    public void setCreatedat(LocalDateTime value) {
        set(5, value);
    }

    /**
     * Getter for <code>library.users.createdAt</code>.
     */
    public LocalDateTime getCreatedat() {
        return (LocalDateTime) get(5);
    }

    /**
     * Setter for <code>library.users.updatedAt</code>.
     */
    public void setUpdatedat(LocalDateTime value) {
        set(6, value);
    }

    /**
     * Getter for <code>library.users.updatedAt</code>.
     */
    public LocalDateTime getUpdatedat() {
        return (LocalDateTime) get(6);
    }

    /**
     * Setter for <code>library.users.createdBy</code>.
     */
    public void setCreatedby(Long value) {
        set(7, value);
    }

    /**
     * Getter for <code>library.users.createdBy</code>.
     */
    public Long getCreatedby() {
        return (Long) get(7);
    }

    /**
     * Setter for <code>library.users.updatedBy</code>.
     */
    public void setUpdatedby(Long value) {
        set(8, value);
    }

    /**
     * Getter for <code>library.users.updatedBy</code>.
     */
    public Long getUpdatedby() {
        return (Long) get(8);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record9 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row9<Long, String, String, String, Byte, LocalDateTime, LocalDateTime, Long, Long> fieldsRow() {
        return (Row9) super.fieldsRow();
    }

    @Override
    public Row9<Long, String, String, String, Byte, LocalDateTime, LocalDateTime, Long, Long> valuesRow() {
        return (Row9) super.valuesRow();
    }

    @Override
    public Field<Long> field1() {
        return Users.USERS.ID;
    }

    @Override
    public Field<String> field2() {
        return Users.USERS.NAME;
    }

    @Override
    public Field<String> field3() {
        return Users.USERS.EMAIL;
    }

    @Override
    public Field<String> field4() {
        return Users.USERS.PASSWORD;
    }

    @Override
    public Field<Byte> field5() {
        return Users.USERS.ACTIVE;
    }

    @Override
    public Field<LocalDateTime> field6() {
        return Users.USERS.CREATEDAT;
    }

    @Override
    public Field<LocalDateTime> field7() {
        return Users.USERS.UPDATEDAT;
    }

    @Override
    public Field<Long> field8() {
        return Users.USERS.CREATEDBY;
    }

    @Override
    public Field<Long> field9() {
        return Users.USERS.UPDATEDBY;
    }

    @Override
    public Long component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getName();
    }

    @Override
    public String component3() {
        return getEmail();
    }

    @Override
    public String component4() {
        return getPassword();
    }

    @Override
    public Byte component5() {
        return getActive();
    }

    @Override
    public LocalDateTime component6() {
        return getCreatedat();
    }

    @Override
    public LocalDateTime component7() {
        return getUpdatedat();
    }

    @Override
    public Long component8() {
        return getCreatedby();
    }

    @Override
    public Long component9() {
        return getUpdatedby();
    }

    @Override
    public Long value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getName();
    }

    @Override
    public String value3() {
        return getEmail();
    }

    @Override
    public String value4() {
        return getPassword();
    }

    @Override
    public Byte value5() {
        return getActive();
    }

    @Override
    public LocalDateTime value6() {
        return getCreatedat();
    }

    @Override
    public LocalDateTime value7() {
        return getUpdatedat();
    }

    @Override
    public Long value8() {
        return getCreatedby();
    }

    @Override
    public Long value9() {
        return getUpdatedby();
    }

    @Override
    public UsersRecord value1(Long value) {
        setId(value);
        return this;
    }

    @Override
    public UsersRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public UsersRecord value3(String value) {
        setEmail(value);
        return this;
    }

    @Override
    public UsersRecord value4(String value) {
        setPassword(value);
        return this;
    }

    @Override
    public UsersRecord value5(Byte value) {
        setActive(value);
        return this;
    }

    @Override
    public UsersRecord value6(LocalDateTime value) {
        setCreatedat(value);
        return this;
    }

    @Override
    public UsersRecord value7(LocalDateTime value) {
        setUpdatedat(value);
        return this;
    }

    @Override
    public UsersRecord value8(Long value) {
        setCreatedby(value);
        return this;
    }

    @Override
    public UsersRecord value9(Long value) {
        setUpdatedby(value);
        return this;
    }

    @Override
    public UsersRecord values(Long value1, String value2, String value3, String value4, Byte value5, LocalDateTime value6, LocalDateTime value7, Long value8, Long value9) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached UsersRecord
     */
    public UsersRecord() {
        super(Users.USERS);
    }

    /**
     * Create a detached, initialised UsersRecord
     */
    public UsersRecord(Long id, String name, String email, String password, Byte active, LocalDateTime createdat, LocalDateTime updatedat, Long createdby, Long updatedby) {
        super(Users.USERS);

        setId(id);
        setName(name);
        setEmail(email);
        setPassword(password);
        setActive(active);
        setCreatedat(createdat);
        setUpdatedat(updatedat);
        setCreatedby(createdby);
        setUpdatedby(updatedby);
    }
}
