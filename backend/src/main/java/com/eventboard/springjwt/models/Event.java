package com.eventboard.springjwt.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 128)
    private String title;

    @Size(max = 256)
    private String description;

    @OneToOne( cascade = CascadeType.ALL )
    @JoinTable( name = "event_coordinates",
    joinColumns = @JoinColumn( name = "event_id"),
    inverseJoinColumns = @JoinColumn( name = "coordinate_id"))
    private Coordinate coordinates;

    public Event() {}

    public Event(Long id, @NotBlank @Size(max = 128) String title, @Size(max = 256) String description, Coordinate coordinates) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.coordinates = coordinates;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Coordinate getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinate coordinates) {
        this.coordinates = coordinates;
    }



    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", coordinates=" + coordinates +
                '}';
    }
}