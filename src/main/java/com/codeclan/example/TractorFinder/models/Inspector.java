package com.codeclan.example.TractorFinder.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inspectors")
public class Inspector {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="postcode")
    private String postcode;

    @Column(name="address")
    private String address;

    @Column(name="phone_number")
    private String phoneNumber;

    @Column(name="email")
    private String email;

    @Column(name="lat")
    private double lat;

    @Column(name="lng")
    private double lng;


    @Column(name="tractor_ids")
    private ArrayList tractorIds;

    @JsonIgnoreProperties({"inspectors"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name="inspectors_tractors",
            joinColumns = {@JoinColumn(name = "inspector_id", nullable=false, updatable=false)},
            inverseJoinColumns = {@JoinColumn(name="tractor_id", nullable=false, updatable=false)}
    )
    private List<Tractor> tractors;


    public Inspector(String name, String postcode, String address, String phoneNumber, String email, double lat, double lng) {
        this.name = name;
        this.postcode = postcode;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.lat = lat;
        this.lng = lng;
        this.tractors = new ArrayList<>();
        this.tractorIds = new ArrayList<>();
    }

    public Inspector(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public List<Tractor> getTractors() {
        return tractors;
    }

    public void setTractors(List<Tractor> tractors) {
        this.tractors = tractors;
    }

    public void addTractor(Tractor tractor){
        this.tractors.add(tractor);
    }

    public ArrayList getTractorIds() {
        return tractorIds;
    }

    public void setTractorIds(ArrayList tractorIds) {
        this.tractorIds = tractorIds;
    }

    public int getNumberOfTractorIds(){
        return this.tractorIds.size();
    }
}
