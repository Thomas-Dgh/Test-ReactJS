import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { getMultiSelected, repeat } from "../../../utils";
import { isCategoriesValid, isNameValid, isBrandValid } from "./validators";


const ProductForm = (props) => {
  const { product = {} } = props;
  const [name, setName] = useState(product.name || "");
  const [brand, setBrand] = useState(product.brand || "");
  const [rating, setRating] = useState(product.rating || 0);
  const [categories, setCategories] = useState(product.categories || []);
  const [itemsInStock, setItemsInStock] = useState(product.itemsInStock || 0);
  const [receiptDate, setReceiptDate] = useState(product.receiptDate || "");
  const [expirationDate, setExpirationDate] = useState(
    product.expirationDate || ""
  );
  const [featured, setFeatured] = useState(product.featured);

  // EXPIRATION DATE
  let minimalExpirationDate = new Date(); 
  minimalExpirationDate = formatDate(
    minimalExpirationDate.setDate(minimalExpirationDate.getDate() + 30)
  ); // NOW + 30D

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSave({
      name,
      brand,
      rating,
      categories,
      itemsInStock,
      receiptDate,
      expirationDate,
      featured,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          required
          invalid={!isNameValid(name)}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <FormFeedback>
          Name is required, the length must not be greater than 200.
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="brand">Brand</Label>
        <Input
          invalid={!isBrandValid(name)}
          type="text"
          name="brand"
          id="brand"
          placeholder="Brand"
          value={brand}
          onChange={({ target }) => setBrand(target.value)}
        />
        <FormFeedback>Brand is required</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="rating">Rating</Label>
        <Input
          required
          type="select"
          name="rating"
          id="rating"
          value={rating}
          onChange={({ target }) => {
            setRating(target.value);
            if (target.value > 8) setFeatured(true);
            else setFeatured(false);
          }}
        >
          {repeat(11).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="categories">Categories</Label>
        <Input
          required
          invalid={!isCategoriesValid(categories)}
          type="select"
          name="categories"
          id="categories"
          multiple
          value={categories}
          onChange={({ target }) => setCategories(getMultiSelected(target))}
        >
          {props.categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Input>
        <FormFeedback>A product must have from 1 to 5 categories</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="itemsInStock">Items In Stock</Label>
        <Input
          required
          type="number"
          name="itemsInStock"
          id="itemsInStock"
          value={itemsInStock}
          onChange={({ target }) => setItemsInStock(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="expirationDate">Expiration date</Label>
        <Input
          required
          type="date"
          name="expirationDate"
          id="expirationDate"
          value={expirationDate}
          invalid={!isCategoriesValid(expirationDate)}
          min={minimalExpirationDate}
          onChange={({ target }) => setExpirationDate(target.value)}
        />
        <FormFeedback>
          If a product has an expiration date it must expire not less than 30
          days since now
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="receiptDate">Receipt date</Label>
        <Input
          type="date"
          name="receiptDate"
          id="receiptDate"
          value={receiptDate}
          onChange={({ target }) => setReceiptDate(target.value)}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={featured}
            onChange={({ target }) => setFeatured(target.checked)}
          />
          Featured
        </Label>
      </FormGroup>

      <Button >Submit</Button>
    </Form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  categories: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProductForm;
