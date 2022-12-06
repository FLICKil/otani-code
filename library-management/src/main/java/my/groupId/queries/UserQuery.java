package my.groupId.queries;

import static my.groupId.jooq.tables.Users.USERS;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.dto.UserDto.User;
import my.groupId.jooq.tables.records.UsersRecord;
import my.groupId.models.Users;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class UserQuery {

  @Autowired DSLContext query;

  public List queryGetAllUsers() {
    return query
        .select(
            USERS.ID,
            USERS.NAME,
            USERS.EMAIL,
            USERS.ACTIVE,
            USERS.CREATEDAT,
            USERS.UPDATEDAT,
            USERS.CREATEDBY,
            USERS.UPDATEDBY)
        .from(USERS)
        .fetch(
            row -> {
              return new User(
                  row.value1(),
                  row.value2(),
                  row.value3(),
                  row.value4().equals((byte) 1),
                  row.value5(),
                  row.value6(),
                  row.value7(),
                  row.value8());
            });
  }

  public User queryGetUser(Long id) {
    var row =
        query
            .select(
                USERS.ID,
                USERS.NAME,
                USERS.EMAIL,
                USERS.ACTIVE,
                USERS.CREATEDAT,
                USERS.UPDATEDAT,
                USERS.CREATEDBY,
                USERS.UPDATEDBY)
            .from(USERS)
            .where(USERS.ID.eq(id))
            .fetchOne();

    if (row == null) {
      return null;
    }

    return new User(
        row.value1(),
        row.value2(),
        row.value3(),
        row.value4().equals((byte) 1),
        row.value5(),
        row.value6(),
        row.value7(),
        row.value8());
  }

  public Users queryGetUserPassword(Long id) {
    var row = query.select(USERS.PASSWORD).from(USERS).where(USERS.ID.eq(id)).fetchOne();
    if (row == null) return null;
    return new Users(row.value1());
  }

  public Users queryGetUser(String email, String password) {
    var row =
        query
            .selectFrom(USERS)
            .where(USERS.EMAIL.eq(email))
            .and(USERS.PASSWORD.eq(password))
            .fetchOne();

    if (row == null) return null;

    return new Users(
        row.getId(),
        row.getName(),
        row.getEmail(),
        row.getPassword(),
        row.getActive() != 0,
        row.getCreatedat(),
        row.getUpdatedat(),
        row.getCreatedby(),
        row.getUpdatedby());
  }

  public boolean queryCreateUser(Users user) {
    UsersRecord checkExist =
        query.selectFrom(USERS).where(USERS.EMAIL.eq(user.getEmail())).fetchOne();
    if (checkExist != null) return false;

    query
        .insertInto(USERS, USERS.NAME, USERS.EMAIL, USERS.PASSWORD, USERS.ACTIVE)
        .values(
            user.getName(), user.getEmail(), user.getPassword(), (byte) (user.isActive() ? 1 : 0))
        .execute();
    return true;
  }

  public boolean queryUpdateUser(Long id, Users user) {
    int result =
        query
            .update(USERS)
            .set(USERS.NAME, user.getName())
            //            .set(USERS.PASSWORD, user.getPassword())
            .set(USERS.ACTIVE, (byte) (user.isActive() ? 1 : 0))
            .set(USERS.UPDATEDBY, user.getUpdatedBy())
            .where(USERS.ID.eq(id))
            .execute();
    return result != 0;
  }

  public boolean queryUpdateUserPassword(Long id, Users user) {
    int result =
        query
            .update(USERS)
            //            .set(USERS.NAME, user.getName())
            .set(USERS.PASSWORD, user.getPassword())
            //            .set(USERS.ACTIVE, (byte) (user.isActive() ? 1 : 0))
            //            .set(USERS.UPDATEDBY, user.getUpdatedBy())
            .where(USERS.ID.eq(id))
            .execute();
    return result != 0;
  }

  public boolean queryDeleteUser(Long id) {
    int result = query.delete(USERS).where(USERS.ID.eq(id)).execute();

    return result == 1;
  }
}
