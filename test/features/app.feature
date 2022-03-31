Feature: order

    User can place product order in basket and make a order.

    Scenario: User adds item to basket
        Given User has selected a "item"
        When User posts "item" to basket
        And "amount" to "basket"
        Then "item" should be added to "basket"
        And "amount" is added to "basket"
        And "totalsum" is updated


    Scenario: User removes item from basket
        Given "User" has "item" in "basket"
        When User removes "item" from "basket"
        Then "item" should be removed from "basket"
        And "totalsum" is updated

    Scenario: User makes order
        Given "User" has "item(s)" in "basket"
        When User makes "order"
        Then "order" should be created
        And "order" should be placed
        And "order" should be sent to "email"

    Scenario: User updates amount in basket
        Given "User" has "item" in "basket"
        When User updates "amount" on "item" in "basket"
        Then "amount" on "item" should be updated in "basket"
        And "totalsum" is updated