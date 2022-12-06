/*
 * This file is generated by jOOQ.
 */
package my.groupId.jooq.tables.records;


import java.time.LocalDateTime;

import my.groupId.jooq.tables.Publisher;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record6;
import org.jooq.Row6;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class PublisherRecord extends UpdatableRecordImpl<PublisherRecord> implements Record6<Long, String, LocalDateTime, LocalDateTime, Long, Long> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>library.publisher.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>library.publisher.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>library.publisher.name</code>.
     */
    public void setName(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>library.publisher.name</code>.
     */
    public String getName() {
        return (String) get(1);
    }

    /**
     * Setter for <code>library.publisher.createdAt</code>.
     */
    public void setCreatedat(LocalDateTime value) {
        set(2, value);
    }

    /**
     * Getter for <code>library.publisher.createdAt</code>.
     */
    public LocalDateTime getCreatedat() {
        return (LocalDateTime) get(2);
    }

    /**
     * Setter for <code>library.publisher.updatedAt</code>.
     */
    public void setUpdatedat(LocalDateTime value) {
        set(3, value);
    }

    /**
     * Getter for <code>library.publisher.updatedAt</code>.
     */
    public LocalDateTime getUpdatedat() {
        return (LocalDateTime) get(3);
    }

    /**
     * Setter for <code>library.publisher.createdBy</code>.
     */
    public void setCreatedby(Long value) {
        set(4, value);
    }

    /**
     * Getter for <code>library.publisher.createdBy</code>.
     */
    public Long getCreatedby() {
        return (Long) get(4);
    }

    /**
     * Setter for <code>library.publisher.updatedBy</code>.
     */
    public void setUpdatedby(Long value) {
        set(5, value);
    }

    /**
     * Getter for <code>library.publisher.updatedBy</code>.
     */
    public Long getUpdatedby() {
        return (Long) get(5);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record6 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row6<Long, String, LocalDateTime, LocalDateTime, Long, Long> fieldsRow() {
        return (Row6) super.fieldsRow();
    }

    @Override
    public Row6<Long, String, LocalDateTime, LocalDateTime, Long, Long> valuesRow() {
        return (Row6) super.valuesRow();
    }

    @Override
    public Field<Long> field1() {
        return Publisher.PUBLISHER.ID;
    }

    @Override
    public Field<String> field2() {
        return Publisher.PUBLISHER.NAME;
    }

    @Override
    public Field<LocalDateTime> field3() {
        return Publisher.PUBLISHER.CREATEDAT;
    }

    @Override
    public Field<LocalDateTime> field4() {
        return Publisher.PUBLISHER.UPDATEDAT;
    }

    @Override
    public Field<Long> field5() {
        return Publisher.PUBLISHER.CREATEDBY;
    }

    @Override
    public Field<Long> field6() {
        return Publisher.PUBLISHER.UPDATEDBY;
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
    public LocalDateTime component3() {
        return getCreatedat();
    }

    @Override
    public LocalDateTime component4() {
        return getUpdatedat();
    }

    @Override
    public Long component5() {
        return getCreatedby();
    }

    @Override
    public Long component6() {
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
    public LocalDateTime value3() {
        return getCreatedat();
    }

    @Override
    public LocalDateTime value4() {
        return getUpdatedat();
    }

    @Override
    public Long value5() {
        return getCreatedby();
    }

    @Override
    public Long value6() {
        return getUpdatedby();
    }

    @Override
    public PublisherRecord value1(Long value) {
        setId(value);
        return this;
    }

    @Override
    public PublisherRecord value2(String value) {
        setName(value);
        return this;
    }

    @Override
    public PublisherRecord value3(LocalDateTime value) {
        setCreatedat(value);
        return this;
    }

    @Override
    public PublisherRecord value4(LocalDateTime value) {
        setUpdatedat(value);
        return this;
    }

    @Override
    public PublisherRecord value5(Long value) {
        setCreatedby(value);
        return this;
    }

    @Override
    public PublisherRecord value6(Long value) {
        setUpdatedby(value);
        return this;
    }

    @Override
    public PublisherRecord values(Long value1, String value2, LocalDateTime value3, LocalDateTime value4, Long value5, Long value6) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached PublisherRecord
     */
    public PublisherRecord() {
        super(Publisher.PUBLISHER);
    }

    /**
     * Create a detached, initialised PublisherRecord
     */
    public PublisherRecord(Long id, String name, LocalDateTime createdat, LocalDateTime updatedat, Long createdby, Long updatedby) {
        super(Publisher.PUBLISHER);

        setId(id);
        setName(name);
        setCreatedat(createdat);
        setUpdatedat(updatedat);
        setCreatedby(createdby);
        setUpdatedby(updatedby);
    }
}
