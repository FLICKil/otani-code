/*
 * This file is generated by jOOQ.
 */
package my.groupId.jooq.tables;


import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import my.groupId.jooq.Keys;
import my.groupId.jooq.Library;
import my.groupId.jooq.tables.records.UsersRecord;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row9;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Users extends TableImpl<UsersRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>library.users</code>
     */
    public static final Users USERS = new Users();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<UsersRecord> getRecordType() {
        return UsersRecord.class;
    }

    /**
     * The column <code>library.users.id</code>.
     */
    public final TableField<UsersRecord, Long> ID = createField(DSL.name("id"), SQLDataType.BIGINT.nullable(false).identity(true), this, "");

    /**
     * The column <code>library.users.name</code>.
     */
    public final TableField<UsersRecord, String> NAME = createField(DSL.name("name"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>library.users.email</code>.
     */
    public final TableField<UsersRecord, String> EMAIL = createField(DSL.name("email"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>library.users.password</code>.
     */
    public final TableField<UsersRecord, String> PASSWORD = createField(DSL.name("password"), SQLDataType.VARCHAR(100).nullable(false), this, "");

    /**
     * The column <code>library.users.active</code>.
     */
    public final TableField<UsersRecord, Byte> ACTIVE = createField(DSL.name("active"), SQLDataType.TINYINT.nullable(false).defaultValue(DSL.inline("1", SQLDataType.TINYINT)), this, "");

    /**
     * The column <code>library.users.createdAt</code>.
     */
    public final TableField<UsersRecord, LocalDateTime> CREATEDAT = createField(DSL.name("createdAt"), SQLDataType.LOCALDATETIME(0), this, "");

    /**
     * The column <code>library.users.updatedAt</code>.
     */
    public final TableField<UsersRecord, LocalDateTime> UPDATEDAT = createField(DSL.name("updatedAt"), SQLDataType.LOCALDATETIME(0), this, "");

    /**
     * The column <code>library.users.createdBy</code>.
     */
    public final TableField<UsersRecord, Long> CREATEDBY = createField(DSL.name("createdBy"), SQLDataType.BIGINT, this, "");

    /**
     * The column <code>library.users.updatedBy</code>.
     */
    public final TableField<UsersRecord, Long> UPDATEDBY = createField(DSL.name("updatedBy"), SQLDataType.BIGINT, this, "");

    private Users(Name alias, Table<UsersRecord> aliased) {
        this(alias, aliased, null);
    }

    private Users(Name alias, Table<UsersRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>library.users</code> table reference
     */
    public Users(String alias) {
        this(DSL.name(alias), USERS);
    }

    /**
     * Create an aliased <code>library.users</code> table reference
     */
    public Users(Name alias) {
        this(alias, USERS);
    }

    /**
     * Create a <code>library.users</code> table reference
     */
    public Users() {
        this(DSL.name("users"), null);
    }

    public <O extends Record> Users(Table<O> child, ForeignKey<O, UsersRecord> key) {
        super(child, key, USERS);
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : Library.LIBRARY;
    }

    @Override
    public Identity<UsersRecord, Long> getIdentity() {
        return (Identity<UsersRecord, Long>) super.getIdentity();
    }

    @Override
    public UniqueKey<UsersRecord> getPrimaryKey() {
        return Keys.KEY_USERS_PRIMARY;
    }

    @Override
    public List<UniqueKey<UsersRecord>> getUniqueKeys() {
        return Arrays.asList(Keys.KEY_USERS_UC_USERS);
    }

    @Override
    public Users as(String alias) {
        return new Users(DSL.name(alias), this);
    }

    @Override
    public Users as(Name alias) {
        return new Users(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Users rename(String name) {
        return new Users(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Users rename(Name name) {
        return new Users(name, null);
    }

    // -------------------------------------------------------------------------
    // Row9 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row9<Long, String, String, String, Byte, LocalDateTime, LocalDateTime, Long, Long> fieldsRow() {
        return (Row9) super.fieldsRow();
    }
}