package my.groupId.queries;

import static my.groupId.jooq.tables.Author.AUTHOR;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.jooq.tables.records.AuthorRecord;
import my.groupId.models.Author;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class AuthorQuery {
  @Autowired DSLContext query;
  @Autowired BookQuery bookQuery;

  public List<Author> queryGetAuthor() {
    return query
        .selectFrom(AUTHOR)
        .fetch(
            row -> {
              return new Author(
                  row.getId(),
                  row.getName(),
                  row.getCreatedat(),
                  row.getUpdatedat(),
                  row.getCreatedby(),
                  row.getUpdatedby());
            });
  }

  public Author queryGetAuthor(Long id) {
    AuthorRecord row = query.selectFrom(AUTHOR).where(AUTHOR.ID.eq(id)).fetchOne();
    if (row == null) return null;
    return new Author(
        row.getId(),
        row.getName(),
        row.getCreatedat(),
        row.getUpdatedat(),
        row.getCreatedby(),
        row.getUpdatedby());
  }

  public boolean queryCreateAuthor(Author author) {
    AuthorRecord checkExist =
        query.selectFrom(AUTHOR).where(AUTHOR.NAME.eq(author.getName())).fetchOne();

    if (checkExist != null) return false;
    query.insertInto(AUTHOR, AUTHOR.NAME).values(author.getName()).execute();
    return true;
  }

  public boolean queryUpdateAuthor(Long id, Author author) {
    int result =
        query
            .update(AUTHOR)
            .set(AUTHOR.NAME, author.getName())
            .set(AUTHOR.UPDATEDBY, author.getUpdatedBy())
            .set(AUTHOR.CREATEDBY, author.getCreatedBy())
            .where(AUTHOR.ID.eq(id))
            .execute();
    return result != 0;
  }

  public int queryDeleteAuthor(Long id) {
    var book = bookQuery.queryGetBookByAuthor(id);
    if (!book.isEmpty()) return 2;
    int result = query.delete(AUTHOR).where(AUTHOR.ID.eq(id)).execute();
    if (result == 1) return 1;
    else return 0;
  }
}
