package my.groupId.models;

import java.time.LocalDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  //  private Long authorId;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "authorId", referencedColumnName = "id")
  private Author author;

  //  private Long categoryId;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "categoryId", referencedColumnName = "id")
  private Category category;

  //  private Long publisherId;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "publisherId", referencedColumnName = "id")
  private Publisher publisher;

  private int amount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private Long createdBy;
  private Long updatedBy;

  @Column(columnDefinition = "MEDIUMBLOB")
  private byte[] coverImg;

  @OneToOne(mappedBy = "book")
  private Rent rent;

  public Book() {}

  //  public Book(
  //      Long id,
  //      String title,
  //      Long authorId,
  //      Long categoryId,
  //      Long publisherId,
  //      int amount,
  //      LocalDateTime createdAt,
  //      LocalDateTime updatedAt,
  //      Long createdBy,
  //      Long updatedBy,
  //      byte[] coverImg) {
  //    this.id = id;
  //    this.title = title;
  //    this.authorId = authorId;
  //    this.categoryId = categoryId;
  //    this.publisherId = publisherId;
  //    this.amount = amount;
  //    this.createdAt = createdAt;
  //    this.updatedAt = updatedAt;
  //    this.createdBy = createdBy;
  //    this.updatedBy = updatedBy;
  //    this.coverImg = coverImg;
  //  }
  //
  //  public Book(
  //      String title, Long authorId, Long categoryId, Long publisherId, int amount, byte[]
  // coverImg) {
  //    this.title = title;
  //    this.authorId = authorId;
  //    this.categoryId = categoryId;
  //    this.publisherId = publisherId;
  //    this.amount = amount;
  //    this.coverImg = coverImg;
  //  }

  //  public Book(String title) {
  //    this.title = title;
  //  }

  public Author getAuthor() {
    return author;
  }

  public void setAuthor(Author author) {
    this.author = author;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public Publisher getPublisher() {
    return publisher;
  }

  public void setPublisher(Publisher publisher) {
    this.publisher = publisher;
  }
  //  public Long getAuthorId() {
  //    return authorId;
  //  }
  //
  //  public void setAuthorId(Long authorId) {
  //    this.authorId = authorId;
  //  }

  //  public Long getCategoryId() {
  //    return categoryId;
  //  }
  //
  //  public void setCategoryId(Long categoryId) {
  //    this.categoryId = categoryId;
  //  }
  //
  //  public Long getPublisherId() {
  //    return publisherId;
  //  }
  //
  //  public void setPublisherId(Long publisherId) {
  //    this.publisherId = publisherId;
  //  }

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Long getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(Long createdBy) {
    this.createdBy = createdBy;
  }

  public Long getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(Long updatedBy) {
    this.updatedBy = updatedBy;
  }

  public byte[] getCoverImg() {
    return coverImg;
  }

  public void setCoverImg(byte[] coverImg) {
    this.coverImg = coverImg;
  }
}
