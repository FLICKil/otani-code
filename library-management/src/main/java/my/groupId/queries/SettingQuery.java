package my.groupId.queries;

import static my.groupId.jooq.tables.Setting.SETTING;

import java.math.BigDecimal;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.jooq.tables.records.SettingRecord;
import my.groupId.models.Setting;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class SettingQuery {
  @Autowired DSLContext query;

  public Setting queryGetSetting(Long id) {
    SettingRecord setting = query.selectFrom(SETTING).where(SETTING.ID.eq(id)).fetchOne();
    if (setting == null) return null;
    return new Setting(
        setting.getId(),
        setting.getUserissuedlimit(),
        setting.getBookreturnday(),
        setting.getCurrency(),
        setting.getOnedayfee(),
        setting.getCreatedat(),
        setting.getUpdatedat(),
        setting.getCreatedby(),
        setting.getUpdatedby());
  }

  public List queryGetSetting() {
    return query
        .selectFrom(SETTING)
        .fetch(
            row -> {
              return new Setting(
                  row.getId(),
                  row.getUserissuedlimit(),
                  row.getBookreturnday(),
                  row.getCurrency(),
                  row.getOnedayfee(),
                  row.getCreatedat(),
                  row.getUpdatedat(),
                  row.getCreatedby(),
                  row.getUpdatedby());
            });
  }

  public boolean queryUpdateSetting(Setting setting) {
    int result =
        query
            .update(SETTING)
            .set(SETTING.BOOKRETURNDAY, setting.getBookReturnDay())
            .set(SETTING.ONEDAYFEE, setting.getOneDayFee())
            .set(SETTING.USERISSUEDLIMIT, setting.getUserIssuedLimit())
            .set(SETTING.CURRENCY, setting.getCurrency())
            .set(SETTING.CREATEDBY, setting.getCreatedBy())
            .set(SETTING.UPDATEDBY, setting.getUpdatedBy())
            .where(SETTING.ID.eq(Long.valueOf(1)))
            .execute();
    return result != 0;
  }

  public BigDecimal queryGetOneDayFee() {
    return query
        .select(SETTING.ONEDAYFEE)
        .from(SETTING)
        .where(SETTING.ID.eq(Long.valueOf(1)))
        .fetchOne()
        .value1();
  }

  public int queryGetBookDayReturn() {
    return query
        .select(SETTING.BOOKRETURNDAY)
        .from(SETTING)
        .where(SETTING.ID.eq(Long.valueOf(1)))
        .fetchOne()
        .value1();
  }

  public String queryGetCurrency() {
    return query
        .select(SETTING.CURRENCY)
        .from(SETTING)
        .where(SETTING.ID.eq(Long.valueOf(1)))
        .fetchOne()
        .value1();
  }

  public int queryGetUserIssuedLimit() {
    return query
        .select(SETTING.USERISSUEDLIMIT)
        .from(SETTING)
        .where(SETTING.ID.eq(Long.valueOf(1)))
        .fetchOne()
        .value1();
  }
}
