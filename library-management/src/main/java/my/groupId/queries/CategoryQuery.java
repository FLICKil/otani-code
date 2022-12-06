package my.groupId.queries;

import static my.groupId.jooq.tables.Category.CATEGORY;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import my.groupId.jooq.tables.records.CategoryRecord;
import my.groupId.models.Category;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

@ApplicationScoped
public class CategoryQuery {
  @Autowired DSLContext query;
  @Autowired BookQuery bookQuery;

  public List<Category> queryGetCategory() {
    return query
        .selectFrom(CATEGORY)
        .fetch(
            row -> {
              return new Category(
                  row.getId(),
                  row.getName(),
                  row.getCreatedat(),
                  row.getUpdatedat(),
                  row.getCreatedby(),
                  row.getUpdatedby());
            });
  }

  public Category queryGetCategory(Long id) {
    CategoryRecord row = query.selectFrom(CATEGORY).where(CATEGORY.ID.eq(id)).fetchOne();
    if (row == null) return null;
    return new Category(
        row.getId(),
        row.getName(),
        row.getCreatedat(),
        row.getUpdatedat(),
        row.getCreatedby(),
        row.getUpdatedby());
  }

  public boolean queryCreateCategory(Category author) {
    CategoryRecord checkExist =
        query.selectFrom(CATEGORY).where(CATEGORY.NAME.eq(author.getName())).fetchOne();

    if (checkExist != null) return false;
    query.insertInto(CATEGORY, CATEGORY.NAME).values(author.getName()).execute();
    return true;
  }

  public boolean queryUpdateCategory(Long id, Category author) {
    int result =
        query
            .update(CATEGORY)
            .set(CATEGORY.NAME, author.getName())
            .where(CATEGORY.ID.eq(id))
            .execute();
    return result != 0;
  }

  public int queryDeleteCategory(Long id) {
    var book = bookQuery.queryGetBookByCate(id);
    if (!book.isEmpty()) return 2;
    int result = query.delete(CATEGORY).where(CATEGORY.ID.eq(id)).execute();
    if (result == 1) return 1;
    else return 0;
  }
}
