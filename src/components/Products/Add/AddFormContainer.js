import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductForm from "../Update/ProductForm";
import { createProductForm } from "../../../actions/products";

class AddFormContainer extends Component {
  render() {
    const {product, categories, dispatch } = this.props;

    return (
      <>
        <Link to="/">Home</Link>
        <ProductForm
          onSave={(product) => {
            dispatch(createProductForm(product));
         // console.log(product)
          }}
          product={product}
          categories={categories}
        />
      </>
    );
  }
}

AddFormContainer.propTypes = {
  product: PropTypes.object,
  categories: PropTypes.array,
};

const mapStateToProps = (state, { productId }) => {
  return {
    products: state.products,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(AddFormContainer);
