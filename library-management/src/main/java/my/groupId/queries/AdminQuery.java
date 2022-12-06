package my.groupId.queries;

import static my.groupId.jooq.tables.Admin.ADMIN;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.dto.AdminDto.AdminR;
import my.groupId.jooq.tables.records.AdminRecord;
import my.groupId.models.Admin;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class AdminQuery {

  @Autowired DSLContext query;

  public List queryGetAdmin() {
    return query
        .select(
            ADMIN.ID,
            ADMIN.NAME,
            ADMIN.CREATEDAT,
            ADMIN.UPDATEDAT,
            ADMIN.CREATEDBY,
            ADMIN.UPDATEDBY)
        .from(ADMIN)
        .fetch(
            row -> {
              return new AdminR(
                  row.value1(),
                  row.value2(),
                  row.value3(),
                  row.value4(),
                  row.value5(),
                  row.value6());
            });
  }

  public AdminR queryGetAdmin(Long id) {
    var row =
        query
            .select(
                ADMIN.ID,
                ADMIN.NAME,
                ADMIN.CREATEDAT,
                ADMIN.UPDATEDAT,
                ADMIN.CREATEDBY,
                ADMIN.UPDATEDBY)
            .from(ADMIN)
            .where(ADMIN.ID.eq(id))
            .fetchOne();

    if (row == null) return null;

    return new AdminR(
        row.value1(), row.value2(), row.value3(), row.value4(), row.value5(), row.value6());
  }

  public Admin queryGetAdmin(String name, String password) {
    AdminRecord row =
        query
            .selectFrom(ADMIN)
            .where(ADMIN.NAME.eq(name))
            .and(ADMIN.PASSWORD.eq(password))
            .fetchOne();
    if (row == null) return null;

    return new Admin(
        row.getId(),
        row.getName(),
        row.getPassword(),
        row.getCreatedat(),
        row.getUpdatedat(),
        row.getCreatedby(),
        row.getUpdatedby());
  }

  public boolean queryCreateAdmin(Admin admin) {
    AdminRecord row = query.selectFrom(ADMIN).where(ADMIN.NAME.eq(admin.getName())).fetchOne();

    if (row == null) return false;

    query
        .insertInto(ADMIN, ADMIN.NAME, ADMIN.PASSWORD)
        .values(admin.getName(), admin.getPassword())
        .execute();

    return true;
  }

  public boolean queryUpdateAdmin(Long id, Admin admin) {
    int result =
        query
            .update(ADMIN)
            .set(ADMIN.PASSWORD, admin.getPassword())
            .where(ADMIN.ID.eq(id))
            .execute();
    return result != 0;
  }

  public boolean queryDeleteAdmin(Long id) {
    int result = query.delete(ADMIN).where(ADMIN.ID.eq(id)).execute();
    return result == 1;
  }
}
