-- MySQL Script generated by MySQL Workbench
-- qua 07 set 2022 14:48:21
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema devShop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema devShop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devShop` ;
USE `devShop` ;

-- -----------------------------------------------------
-- Table `devShop`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devShop`.`product_variations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`product_variations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(245) NULL,
  `available` INT NULL,
  `variation_name` VARCHAR(245) NULL,
  `price` FLOAT NULL,
  `price_from` FLOAT NULL,
  `weight` INT NULL,
  `order` INT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_variations_products_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_variations_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `devShop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devShop`.`product_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`product_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(245) NULL,
  `url` VARCHAR(245) NULL,
  `order` INT NULL,
  `product_variation_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_images_product_variations1_idx` (`product_variation_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_images_product_variations1`
    FOREIGN KEY (`product_variation_id`)
    REFERENCES `devShop`.`product_variations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devShop`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(245) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devShop`.`categories_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`categories_products` (
  `product_id` INT NOT NULL,
  `categorie_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `categorie_id`),
  INDEX `fk_products_has_categories_categories1_idx` (`categorie_id` ASC) VISIBLE,
  INDEX `fk_products_has_categories_products1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_categories_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `devShop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_categories_categories1`
    FOREIGN KEY (`categorie_id`)
    REFERENCES `devShop`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devShop`.`bunner_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`bunner_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bunner_type` VARCHAR(245) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devShop`.`bunners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `devShop`.`bunners` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `bunner_types_id` INT NOT NULL,
  `url` VARCHAR(245) NULL,
  `order` INT NULL,
  `image_url` VARCHAR(245) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bunners_bunner_types1_idx` (`bunner_types_id` ASC) VISIBLE,
  CONSTRAINT `fk_bunners_bunner_types1`
    FOREIGN KEY (`bunner_types_id`)
    REFERENCES `devShop`.`bunner_types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
