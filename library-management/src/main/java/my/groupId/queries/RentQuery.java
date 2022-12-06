package my.groupId.queries;

import static java.time.temporal.ChronoUnit.DAYS;
import static my.groupId.jooq.tables.Rent.RENT;
import static org.jooq.impl.DSL.count;
import static org.jooq.impl.DSL.max;
import static org.jooq.impl.DSL.row;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.dto.BookDto.BookR;
import my.groupId.dto.RentDto.Author;
import my.groupId.dto.RentDto.Book;
import my.groupId.dto.RentDto.Category;
import my.groupId.dto.RentDto.Publisher;
import my.groupId.dto.RentDto.RentR;
import my.groupId.dto.RentDto.User;
import my.groupId.dto.UserDto;
import my.groupId.models.Rent;
import my.groupId.models.Users;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class RentQuery {
  @Autowired DSLContext query;

  @Autowired BookQuery bookQuery;

  @Autowired UserQuery userQuery;

  @Autowired SettingQuery settingQuery;

  public LocalDate startDate(Long id) {
    return query.select(RENT.STARTDATE).from(RENT).where(RENT.ID.eq(id)).fetchOne().value1();
  }

  public LocalDate endDate(Long id) {
    return query.select(RENT.ENDDATE).from(RENT).where(RENT.ID.eq(id)).fetchOne().value1();
  }

  public BigDecimal calcFee(LocalDate startDate, LocalDate endDate) {
    BigDecimal calcFine;
    LocalDate now = java.time.LocalDate.now();
    BigDecimal fee = settingQuery.queryGetOneDayFee();
    int bookReturnDay = settingQuery.queryGetBookDayReturn();
    if (endDate == null && DAYS.between(startDate,now) <= bookReturnDay) return BigDecimal.ZERO;
    if (endDate == null && DAYS.between(startDate,now) > bookReturnDay) {
        calcFine = BigDecimal.valueOf(DAYS.between(startDate, now) - bookReturnDay);
    }
    else calcFine = BigDecimal.valueOf(DAYS.between(startDate, endDate) - bookReturnDay);
    return calcFine.compareTo(BigDecimal.ZERO) < 0 ? BigDecimal.ZERO : calcFine.multiply(fee);
  }

  public List queryGetRent() {
    return query
        .select(
            RENT.ID,
            row(
                    RENT.book().ID,
                    RENT.book().TITLE,
                    row(RENT.book().author().NAME).mapping(Author::new),
                    row(RENT.book().category().NAME).mapping(Category::new),
                    row(RENT.book().publisher().NAME).mapping(Publisher::new))
                .mapping(Book::new),
            row(RENT.users().ID, RENT.users().NAME).mapping(User::new),
            RENT.STARTDATE,
            RENT.ENDDATE,
            RENT.FINES,
            RENT.CREATEDAT,
            RENT.UPDATEDAT,
            RENT.CREATEDBY,
            RENT.CREATEDBY)
        .from(RENT)
        .orderBy(RENT.ID.desc())
        .fetch(
            row -> {
              return new RentR(
                  row.value1(),
                  row.value2(),
                  row.value3(),
                  row.value4(),
                  row.value5(),
                  row.value6(),
                  row.value7(),
                  row.value8(),
                  row.value9(),
                  row.value10());
            });
  }

  public RentR queryGetRent(Long id) {
    var row =
        query
            .select(
                RENT.ID,
                row(
                        RENT.book().ID,
                        RENT.book().TITLE,
                        row(RENT.book().author().NAME).mapping(Author::new),
                        row(RENT.book().category().NAME).mapping(Category::new),
                        row(RENT.book().publisher().NAME).mapping(Publisher::new))
                    .mapping(Book::new),
                row(RENT.users().ID, RENT.users().NAME).mapping(User::new),
                RENT.STARTDATE,
                RENT.ENDDATE,
                RENT.FINES,
                RENT.CREATEDAT,
                RENT.UPDATEDAT,
                RENT.CREATEDBY,
                RENT.CREATEDBY)
            .from(RENT)
            .where(RENT.ID.eq(id))
            .fetchOne();

    if (row == null) return null;

    return new RentR(
        row.value1(),
        row.value2(),
        row.value3(),
        row.value4(),
        row.value5(),
        row.value6(),
        row.value7(),
        row.value8(),
        row.value9(),
        row.value10());
  }

  public Long queryGetLastestId() {
    return query.select(max(RENT.ID)).from(RENT).fetchOne().value1();
  }

  public List<RentR> queryGetRentByBook(Long id) {
    return query
        .select(
            RENT.ID,
            row(
                    RENT.book().ID,
                    RENT.book().TITLE,
                    row(RENT.book().author().NAME).mapping(Author::new),
                    row(RENT.book().category().NAME).mapping(Category::new),
                    row(RENT.book().publisher().NAME).mapping(Publisher::new))
                .mapping(Book::new),
            row(RENT.users().ID, RENT.users().NAME).mapping(User::new),
            RENT.STARTDATE,
            RENT.ENDDATE,
            RENT.FINES,
            RENT.CREATEDAT,
            RENT.UPDATEDAT,
            RENT.CREATEDBY,
            RENT.CREATEDBY)
        .from(RENT)
        .where(RENT.BOOKID.eq(id))
        .fetch(
            row -> {
              return new RentR(
                  row.value1(),
                  row.value2(),
                  row.value3(),
                  row.value4(),
                  row.value5(),
                  row.value6(),
                  row.value7(),
                  row.value8(),
                  row.value9(),
                  row.value10());
            });
  }

  public List<RentR> queryUserGetRent(Users users) {
    List<RentR> result =
        query
            .select(
                RENT.ID,
                row(
                        RENT.book().ID,
                        RENT.book().TITLE,
                        row(RENT.book().author().NAME).mapping(Author::new),
                        row(RENT.book().category().NAME).mapping(Category::new),
                        row(RENT.book().publisher().NAME).mapping(Publisher::new))
                    .mapping(Book::new),
                row(RENT.users().ID, RENT.users().NAME).mapping(User::new),
                RENT.STARTDATE,
                RENT.ENDDATE,
                RENT.FINES,
                RENT.CREATEDAT,
                RENT.UPDATEDAT,
                RENT.CREATEDBY,
                RENT.CREATEDBY)
            .from(RENT)
            .where(RENT.USERID.eq(users.getId()))
            .fetch(
                row -> {
                  return new RentR(
                      row.value1(),
                      row.value2(),
                      row.value3(),
                      row.value4(),
                      row.value5(),
                      row.value6(),
                      row.value7(),
                      row.value8(),
                      row.value9(),
                      row.value10());
                });

    return result;
  }

  public RentR queryUserGetRent(Long id, Users users) {
    var row =
        query
            .select(
                RENT.ID,
                row(
                        RENT.book().ID,
                        RENT.book().TITLE,
                        row(RENT.book().author().NAME).mapping(Author::new),
                        row(RENT.book().category().NAME).mapping(Category::new),
                        row(RENT.book().publisher().NAME).mapping(Publisher::new))
                    .mapping(Book::new),
                row(RENT.users().ID, RENT.users().NAME).mapping(User::new),
                RENT.STARTDATE,
                RENT.ENDDATE,
                RENT.FINES,
                RENT.CREATEDAT,
                RENT.UPDATEDAT,
                RENT.CREATEDBY,
                RENT.CREATEDBY)
            .from(RENT)
            .where(RENT.USERID.eq(users.getId()))
            .and(RENT.ID.eq(id))
            .fetchOne();
    if (row == null) return null;

    return new RentR(
        row.value1(),
        row.value2(),
        row.value3(),
        row.value4(),
        row.value5(),
        row.value6(),
        row.value7(),
        row.value8(),
        row.value9(),
        row.value10());
  }

  public int queryCreateRent(Rent rent) {
    int checkUserLimit =
        query
            .select(count(RENT.USERID))
            .from(RENT)
            .where(RENT.USERID.eq(rent.getUser().getId()))
            .and(RENT.ENDDATE.isNull())
            .fetchOne()
            .value1();

    if (checkUserLimit >= settingQuery.queryGetUserIssuedLimit()) return 0;

    UserDto.User checkUser = userQuery.queryGetUser(rent.getUser().getId());
    if (checkUser == null) return 3;

    var checkBookAvailable =
        query
            .select(RENT.BOOKID, DSL.count())
            .from(RENT)
            .where(RENT.BOOKID.eq(rent.getBook().getId()))
            .and(RENT.ENDDATE.isNull())
            .groupBy(RENT.BOOKID)
            .fetchOne();

    if (checkBookAvailable != null) {
      if (checkBookAvailable.value2()
          >= bookQuery.queryGetBook(checkBookAvailable.value1()).amount()) return 2;
    }

    BookR checkBook = bookQuery.queryGetBook(rent.getBook().getId());
    if (checkBook == null) return 4;

    query
        .insertInto(RENT, RENT.BOOKID, RENT.USERID, RENT.STARTDATE, RENT.CREATEDBY, RENT.UPDATEDBY)
        .values(
            rent.getBook().getId(),
            rent.getUser().getId(),
            LocalDate.now(),
            rent.getCreatedBy(),
            rent.getUpdatedBy())
        .execute();
    return 1;
  }

  public boolean queryUpdateRent(Long id, Rent rent) {
    int result =
        query
            .update(RENT)
            .set(RENT.ENDDATE, LocalDate.now())
            .set(RENT.FINES, rent.getFines())
            .where(RENT.ID.eq(id))
            .execute();
    return result != 0;
  }
}
