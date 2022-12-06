package my.groupId.queries;

import static my.groupId.jooq.tables.Book.BOOK;
import static org.jooq.impl.DSL.row;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.dto.BookDto.Author;
import my.groupId.dto.BookDto.BookR;
import my.groupId.dto.BookDto.Category;
import my.groupId.dto.BookDto.Publisher;
import my.groupId.jooq.tables.records.BookRecord;
import my.groupId.models.Book;
import org.jooq.DSLContext;
import org.jooq.Records;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class BookQuery {
  @Autowired DSLContext query;
  @Autowired RentQuery rentQuery;

  public List<BookR> queryGetBooks() {
    return query
        .select(
            BOOK.ID,
            BOOK.TITLE,
            row(BOOK.author().ID, BOOK.author().NAME).mapping(Author::new),
            row(BOOK.category().ID, BOOK.category().NAME).mapping(Category::new),
            row(BOOK.publisher().ID, BOOK.publisher().NAME).mapping(Publisher::new),
            BOOK.AMOUNT,
            BOOK.COVERIMG,
            BOOK.CREATEDAT,
            BOOK.UPDATEDAT,
            BOOK.CREATEDBY,
            BOOK.UPDATEDBY)
        .from(BOOK)
        .orderBy(BOOK.ID.asc())
        .fetch(Records.mapping(BookR::new));
  }

  public BookR queryGetBook(Long id) {
    var row =
        query
            .select(
                BOOK.ID,
                BOOK.TITLE,
                row(BOOK.author().ID, BOOK.author().NAME).mapping(Author::new),
                row(BOOK.category().ID, BOOK.category().NAME).mapping(Category::new),
                row(BOOK.publisher().ID, BOOK.publisher().NAME).mapping(Publisher::new),
                BOOK.AMOUNT,
                BOOK.COVERIMG,
                BOOK.CREATEDAT,
                BOOK.UPDATEDAT,
                BOOK.CREATEDBY,
                BOOK.UPDATEDBY)
            .from(BOOK)
            .where(BOOK.ID.eq(id))
            .fetchOne();

    if (row == null) return null;

    return new BookR(
        row.value1(),
        row.value2(),
        row.value3(),
        row.value4(),
        row.value5(),
        row.value6(),
        row.value7(),
        row.value8(),
        row.value9(),
        row.value10(),
        row.value11());
  }

  public BookR queryGetBook(String title) {
    var row =
        query
            .select(
                BOOK.ID,
                BOOK.TITLE,
                row(BOOK.author().ID, BOOK.author().NAME).mapping(Author::new),
                row(BOOK.category().ID, BOOK.category().NAME).mapping(Category::new),
                row(BOOK.publisher().ID, BOOK.publisher().NAME).mapping(Publisher::new),
                BOOK.AMOUNT,
                BOOK.COVERIMG,
                BOOK.CREATEDAT,
                BOOK.UPDATEDAT,
                BOOK.CREATEDBY,
                BOOK.UPDATEDBY)
            .from(BOOK)
            .where(BOOK.TITLE.equalIgnoreCase(title))
            .fetchOne();

    return new BookR(
        row.value1(),
        row.value2(),
        row.value3(),
        row.value4(),
        row.value5(),
        row.value6(),
        row.value7(),
        row.value8(),
        row.value9(),
        row.value10(),
        row.value11());
  }

  public List<BookR> queryGetBookByCate(Long id) {
    return query
        .select(
            BOOK.ID,
            BOOK.TITLE,
            row(BOOK.author().ID, BOOK.author().NAME).mapping(Author::new),
            row(BOOK.category().ID, BOOK.category().NAME).mapping(Category::new),
            row(BOOK.publisher().ID, BOOK.publisher().NAME).mapping(Publisher::new),
            BOOK.AMOUNT,
            BOOK.COVERIMG,
            BOOK.CREATEDAT,
            BOOK.UPDATEDAT,
            BOOK.CREATEDBY,
            BOOK.UPDATEDBY)
        .from(BOOK)
        .where(BOOK.CATEGORYID.eq(id))
        .fetch(Records.mapping(BookR::new));
  }

  public List<BookR> queryGetBookByAuthor(Long id) {
    return query
        .select(
            BOOK.ID,
            BOOK.TITLE,
            row(BOOK.author().ID, BOOK.author().NAME).mapping(Author::new),
            row(BOOK.category().ID, BOOK.category().NAME).mapping(Category::new),
            row(BOOK.publisher().ID, BOOK.publisher().NAME).mapping(Publisher::new),
            BOOK.AMOUNT,
            BOOK.COVERIMG,
            BOOK.CREATEDAT,
            BOOK.UPDATEDAT,
            BOOK.CREATEDBY,
            BOOK.UPDATEDBY)
        .from(BOOK)
        .where(BOOK.AUTHORID.eq(id))
        .fetch(Records.mapping(BookR::new));
  }

  public List<BookR> queryGetBookByPublisher(Long id) {
    return query
        .select(
            BOOK.ID,
            BOOK.TITLE,
            row(BOOK.author().ID, BOOK.author().NAME).mapping(Author::new),
            row(BOOK.category().ID, BOOK.category().NAME).mapping(Category::new),
            row(BOOK.publisher().ID, BOOK.publisher().NAME).mapping(Publisher::new),
            BOOK.AMOUNT,
            BOOK.COVERIMG,
            BOOK.CREATEDAT,
            BOOK.UPDATEDAT,
            BOOK.CREATEDBY,
            BOOK.UPDATEDBY)
        .from(BOOK)
        .where(BOOK.PUBLISHERID.eq(id))
        .fetch(Records.mapping(BookR::new));
  }

  public boolean queryCreateBook(Book book) {
    BookRecord check =
        query
            .selectFrom(BOOK)
            .where(BOOK.TITLE.equalIgnoreCase(book.getTitle()))
            .and(BOOK.AUTHORID.eq(book.getAuthor().getId()))
            .fetchOne();

    if (check != null) return false;

    query
        .insertInto(
            BOOK,
            BOOK.TITLE,
            BOOK.AUTHORID,
            BOOK.CATEGORYID,
            BOOK.PUBLISHERID,
            BOOK.AMOUNT,
            BOOK.COVERIMG)
        .values(
            book.getTitle(),
            book.getAuthor().getId(),
            book.getCategory().getId(),
            book.getPublisher().getId(),
            book.getAmount(),
            book.getCoverImg())
        .execute();
    return true;
  }

  public int queryUpdateBook(Long id, Book book) {
    BookRecord check =
        query
            .selectFrom(BOOK)
            .where(BOOK.TITLE.equalIgnoreCase(book.getTitle()))
            .and(BOOK.AUTHORID.eq(book.getAuthor().getId()))
            .and(BOOK.ID.notEqual(id))
            .fetchOne();

    if (check != null) return 2;

    int result =
        query
            .update(BOOK)
            .set(BOOK.TITLE,book.getTitle())
            .set(BOOK.AUTHORID, book.getAuthor().getId())
            .set(BOOK.CATEGORYID, book.getCategory().getId())
            .set(BOOK.PUBLISHERID, book.getPublisher().getId())
            .set(BOOK.AMOUNT, book.getAmount())
            .set(BOOK.COVERIMG, book.getCoverImg())
            .set(BOOK.CREATEDBY, book.getCreatedBy())
            .set(BOOK.UPDATEDBY, book.getUpdatedBy())
            .where(BOOK.ID.eq(id))
            .execute();
    if (result != 0) return 1;
    else return 0;
  }

  public int queryDeleteBook(Long id) {
    var rent = rentQuery.queryGetRentByBook(id);
    if (!rent.isEmpty()) return 2;
    int result = query.delete(BOOK).where(BOOK.ID.eq(id)).execute();
    if (result == 1) return 1;
    else return 0;
  }
}
