<?php

use Bitrix\Main\Error;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Web\Json;

\Bitrix\Main\UI\Extension::load("local.vue-apps.order");

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var OpenSourceOrderComponent $component */

?>

<form action="" method="post" name="os-order-form" id="os-order-form">

    <input type="hidden" name="person_type_id" value="<?=$arParams['PERSON_TYPE_ID']?>">

    <h2><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE')?>:</h2>
    <table>
        <?php foreach ($arResult['PROPERTIES'] as $propCode => $arProp): ?>
            <tr>
                <td>
                    <label for="<?= $arProp['FORM_LABEL'] ?>">
                        <?= $arProp['NAME'] ?>
                        <?php if($arProp['IS_REQUIRED']) printf(
                            '<span class="required" style="color: red;" title="%s">*</span>',
                            Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_FIELD_REQUIRED')
                        ); ?>
                    </label>
                    <? foreach ($arProp['ERRORS'] as $error):
                        /** @var Error $error */
                        ?>
                        <div class="error"><?= $error->getMessage() ?></div>
                    <? endforeach; ?>
                </td>
                <td>
                <?echo $arPropp['FORM_LABEL']?>
                <?echo $arPropp['VALUE']?>
                <?echo Json::encode($arProp['LOCATION_DATA'])?>
                    <?php
                    switch ($arProp['TYPE']):
                        case 'LOCATION':
                            ?>
                            <div class="location">
                                <select class="location-search" name="<?= $arProp['FORM_NAME'] ?>"
                                        id="<?= $arProp['FORM_LABEL'] ?>">
                                    <option
                                            data-data='<?echo Json::encode($arProp['LOCATION_DATA'])?>'
                                            value="<?= $arProp['VALUE'] ?>"><?=$arProp['LOCATION_DATA']['label']?></option>
                                </select>
                            </div>
                            <?
                            break;

                        case 'ENUM':
                            foreach ($arProp['OPTIONS'] as $code => $name):?>
                                <label class="enum-option">
                                    <input type="radio" name="<?= $arProp['FORM_NAME'] ?>" value="<?= $code ?>">
                                    <?= $name ?>
                                </label>
                            <?endforeach;
                            break;

                        case 'DATE':
                            $APPLICATION->IncludeComponent(
                                'bitrix:main.calendar',
                                '',
                                [
                                    'SHOW_INPUT' => 'Y',
                                    'FORM_NAME' => 'os-order-form',
                                    'INPUT_NAME' => $arProp['FORM_NAME'],
                                    'INPUT_VALUE' => $arProp['VALUE'],
                                    'SHOW_TIME' => 'Y',
                                    //'HIDE_TIMEBAR' => 'Y',
                                    'INPUT_ADDITIONAL_ATTR' => 'placeholder="выберите дату"'
                                ]
                            );
                            break;

                        case 'Y/N':
                            ?>
                            <input id="<?= $arProp['FORM_LABEL'] ?>" type="checkbox"
                                   name="<?= $arProp['FORM_NAME'] ?>"
                                   value="Y">
                            <?
                            break;

                        default:
                            ?>
                            <input id="<?= $arProp['FORM_LABEL'] ?>" type="text"
                                   name="<?= $arProp['FORM_NAME'] ?>"
                                   value="<?= $arProp['VALUE'] ?>">
                        <? endswitch; ?>
                </td>
            </tr>
        <? endforeach; ?>
    </table>

    <h2><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_DELIVERIES_TITLE')?>:</h2>
    <? foreach ($arResult['DELIVERY_ERRORS'] as $error):
        /** @var Error $error */
        ?>
        <div class="error"><?= $error->getMessage() ?></div>
    <? endforeach;
    foreach ($arResult['DELIVERY_LIST'] as $arDelivery):?>
        <label>
            <input type="radio" name="delivery_id"
                   value="<?= $arDelivery['ID'] ?>"
                <?= $arDelivery['CHECKED'] ? 'checked' : '' ?>
            >
            <?= $arDelivery['NAME'] ?>,
            <?= $arDelivery['PRICE_DISPLAY'] ?>
        </label>
        <br>
    <? endforeach; ?>

    <h2><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_PAY_SYSTEMS_TITLE')?>:</h2>
    <? foreach ($arResult['PAY_SYSTEM_ERRORS'] as $error):
        /** @var Error $error */
        ?>
        <div class="error"><?= $error->getMessage() ?></div>
    <? endforeach;
    foreach ($arResult['PAY_SYSTEM_LIST'] as $arPaySystem): ?>
        <label>
            <input type="radio" name="pay_system_id"
                   value="<?= $arPaySystem['ID'] ?>"
                <?= $arPaySystem['CHECKED'] ? 'checked' : '' ?>
            >
            <?= $arPaySystem['NAME'] ?>
        </label>
        <br>
    <? endforeach; ?>

    <h2><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TITLE')?></h2>
    <table>
        <tr>
            <th><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_BASKET_NAME_COLUMN')?></th>
            <th><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_BASKET_COUNT_COLUMN')?></th>
            <th><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_BASKET_UNIT_PRICE_COLUMN')?></th>
            <th><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_BASKET_DISCOUNT_COLUMN')?></th>
            <th><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TOTAL_COLUMN')?></th>
        </tr>
        <? foreach ($arResult['BASKET'] as $arBasketItem): ?>
            <tr>
                <td>
                    <?= $arBasketItem['NAME'] ?>
                    <? if (!empty($arBasketItem['PROPERTIES'])): ?>
                        <div class="basket-properties">
                            <? foreach ($arBasketItem['PROPERTIES'] as $arProp): ?>
                                <?= $arProp['NAME'] ?>
                                <?= $arProp['VALUE'] ?>
                                <br>
                            <? endforeach; ?>
                        </div>
                    <? endif; ?>
                </td>
                <td><?= $arBasketItem['QUANTITY_DISPLAY'] ?></td>
                <td><?= $arBasketItem['BASE_PRICE_DISPLAY'] ?></td>
                <td><?= $arBasketItem['PRICE_DISPLAY'] ?></td>
                <td><?= $arBasketItem['SUM_DISPLAY'] ?></td>
            </tr>
        <? endforeach; ?>
    </table>

    <h2><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE')?></h2>
    <h3><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE')?>:</h3>
    <table>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE')?></td>
            <td><?= $arResult['PRODUCTS_BASE_PRICE_DISPLAY'] ?></td>
        </tr>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE')?></td>
            <td><?= $arResult['PRODUCTS_PRICE_DISPLAY'] ?></td>
        </tr>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT')?></td>
            <td><?= $arResult['PRODUCTS_DISCOUNT_DISPLAY'] ?></td>
        </tr>
    </table>

    <h3><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE')?>:</h3>
    <table>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE')?></td>
            <td><?= $arResult['DELIVERY_BASE_PRICE_DISPLAY'] ?></td>
        </tr>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE')?></td>
            <td><?= $arResult['DELIVERY_PRICE_DISPLAY'] ?></td>
        </tr>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT')?></td>
            <td><?= $arResult['DELIVERY_DISCOUNT_DISPLAY'] ?></td>
        </tr>
    </table>

    <h3><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE')?>:</h3>
    <table>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE')?></td>
            <td><?= $arResult['SUM_BASE_DISPLAY'] ?></td>
        </tr>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT')?></td>
            <td><?= $arResult['DISCOUNT_VALUE_DISPLAY'] ?></td>
        </tr>
        <tr>
            <td><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE')?></td>
            <td><?= $arResult['SUM_DISPLAY'] ?></td>
        </tr>
    </table>

    <input type="hidden" name="save" value="y">
    <br>
    <button type="submit"><?= Loc::getMessage('OPEN_SOURCE_ORDER_TEMPLATE_MAKE_ORDER_BUTTON')?></button>
    <br>
    <br>

</form>

<div id="twpxOrderMake"></div>

<script>
	const twpxordermake = new BX.OrderMake('#twpxOrderMake', {
    SESSION_ID: 'sdfdsf',
    SIGNED_PARAMETERS: 'sdfdsfsdf',
    OPTIONS: {
      order: {
            sessid: BX.bitrix_sessid(),
            'soa-action': 'saveOrderAjax',
            location_type: 'code',
            BUYER_STORE: '0',
            DELIVERY_ID: '2',
            PERSON_TYPE: '1',
            PERSON_TYPE_OLD: '1',
            ORDER_PROP_6: '0000073738',
            RECENT_DELIVERY_VALUE: '0000073738',
            PAY_SYSTEM_ID: '4',
            ORDER_PROP_1: '<Без имени>',
            ORDER_PROP_2: 'support@twinpx.ru',
            ORDER_PROP_3: '',
            ORDER_PROP_7: '',
            ORDER_DESCRIPTION: '',
          },
          sessid: BX.bitrix_sessid(),
          via_ajax: 'Y',
          SITE_ID: 's1',
          signedParamsString:
            'YToxNzU6e3M6MTY6IlBBWV9GUk9NX0FDQ09VTlQiO3M6MToiWSI7czoxODoiQ09VTlRfREVMSVZFUllfVEFYIjtzOjE6Ik4iO3M6Mjk6IkNPVU5UX0RJU0NPVU5UXzRfQUxMX1FVQU5USVRZIjtzOjE6Ik4iO3M6MjY6Ik9OTFlfRlVMTF9QQVlfRlJPTV9BQ0NPVU5UIjtzOjE6Ik4iO3M6MTk6IkFMTE9XX0FVVE9fUkVHSVNURVIiO3M6MToiWSI7czoyMDoiU0VORF9ORVdfVVNFUl9OT1RJRlkiO3M6MToiWSI7czoxNjoiREVMSVZFUllfTk9fQUpBWCI7czoxOiJOIjtzOjE3OiJURU1QTEFURV9MT0NBVElPTiI7czo1OiJwb3B1cCI7czo2OiJQUk9QXzEiO2E6MDp7fXM6MTQ6IlBBVEhfVE9fQkFTS0VUIjtzOjE1OiIvcGVyc29uYWwvY2FydC8iO3M6MTY6IlBBVEhfVE9fUEVSU09OQUwiO3M6MTY6Ii9wZXJzb25hbC9vcmRlci8iO3M6MTU6IlBBVEhfVE9fUEFZTUVOVCI7czoyNDoiL3BlcnNvbmFsL29yZGVyL3BheW1lbnQvIjtzOjEzOiJQQVRIX1RPX09SREVSIjtzOjIxOiIvcGVyc29uYWwvb3JkZXIvbWFrZS8iO3M6OToiU0VUX1RJVExFIjtzOjE6IlkiO3M6MTk6IlNIT1dfQUNDT1VOVF9OVU1CRVIiO3M6MToiWSI7czoxOToiREVMSVZFUllfTk9fU0VTU0lPTiI7czoxOiJZIjtzOjE1OiJDT01QQVRJQkxFX01PREUiO3M6MToiTiI7czoxNToiQkFTS0VUX1BPU0lUSU9OIjtzOjY6ImJlZm9yZSI7czoyMToiQkFTS0VUX0lNQUdFU19TQ0FMSU5HIjtzOjg6ImFkYXB0aXZlIjtzOjIzOiJTRVJWSUNFU19JTUFHRVNfU0NBTElORyI7czo4OiJhZGFwdGl2ZSI7czoxMjoiVVNFUl9DT05TRU5UIjtzOjE6IlkiO3M6MTU6IlVTRVJfQ09OU0VOVF9JRCI7czoxOiIyIjtzOjIzOiJVU0VSX0NPTlNFTlRfSVNfQ0hFQ0tFRCI7czoxOiJZIjtzOjIyOiJVU0VSX0NPTlNFTlRfSVNfTE9BREVEIjtzOjE6IlkiO3M6MTA6IkNBQ0hFX1RZUEUiO3M6MToiQSI7czoxMToiVVNFX1BSRUxPQUQiO3M6MToiWSI7czoxNToiQUNUSU9OX1ZBUklBQkxFIjtzOjEwOiJzb2EtYWN0aW9uIjtzOjExOiJOT19QRVJTT05BTCI7czoxOiJOIjtzOjEyOiJQQVRIX1RPX0FVVEgiO3M6NjoiL2F1dGgvIjtzOjE0OiJVU0VfUFJFUEFZTUVOVCI7czoxOiJOIjtzOjE4OiJESVNQTEFZX0lNR19IRUlHSFQiO2k6OTA7czoxNDoiU0hPV19WQVRfUFJJQ0UiO3M6MToiWSI7czoyMToiREVMSVZFUllfVE9fUEFZU1lTVEVNIjtzOjM6ImQycCI7czoyMzoiRElTQUJMRV9CQVNLRVRfUkVESVJFQ1QiO3M6MToiTiI7czoyMjoiRU1QVFlfQkFTS0VUX0hJTlRfUEFUSCI7czoxOiIvIjtzOjEyOiJDVVJSRU5UX1BBR0UiO3M6MzE6Ii9wZXJzb25hbC9vcmRlci9tYWtlL2luZGV4NC5waHAiO3M6MTU6IklTX0xBTkRJTkdfU0hPUCI7czoxOiJOIjtzOjE4OiJBTExPV19BUFBFTkRfT1JERVIiO3M6MToiWSI7czoxNzoiQUxMT1dfTkVXX1BST0ZJTEUiO3M6MToiWSI7czozMDoiU0hPV19OT1RfQ0FMQ1VMQVRFRF9ERUxJVkVSSUVTIjtzOjE6IlkiO3M6MjI6IlNQT1RfTE9DQVRJT05fQllfR0VPSVAiO3M6MToiWSI7czoxNToiUFJPRFVDVF9DT0xVTU5TIjthOjU6e3M6NDoiTkFNRSI7czoxNjoi0J3QsNC30LLQsNC90LjQtSI7czoxNToiUFJFVklFV19QSUNUVVJFIjtzOjIyOiLQmNC30L7QsdGA0LDQttC10L3QuNC1IjtzOjU6IlBST1BTIjtzOjE2OiLQodCy0L7QudGB0YLQstCwIjtzOjg6IlFVQU5USVRZIjtzOjIwOiLQmtC+0LvQuNGH0LXRgdGC0LLQviI7czozOiJTVU0iO3M6MTA6ItCh0YPQvNC80LAiO31zOjIzOiJQUk9EVUNUX0NPTFVNTlNfVklTSUJMRSI7YToyOntpOjA7czoxNToiUFJFVklFV19QSUNUVVJFIjtpOjE7czo1OiJQUk9QUyI7fXM6MjI6IlBST0RVQ1RfQ09MVU1OU19ISURERU4iO2E6MDp7fXM6MjM6IlVTRV9QSE9ORV9OT1JNQUxJWkFUSU9OIjtzOjE6IlkiO3M6MTc6In5QQVlfRlJPTV9BQ0NPVU5UIjtzOjE6IlkiO3M6MTk6In5DT1VOVF9ERUxJVkVSWV9UQVgiO3M6MToiTiI7czozMDoifkNPVU5UX0RJU0NPVU5UXzRfQUxMX1FVQU5USVRZIjtzOjE6Ik4iO3M6Mjc6In5PTkxZX0ZVTExfUEFZX0ZST01fQUNDT1VOVCI7czoxOiJOIjtzOjIwOiJ+QUxMT1dfQVVUT19SRUdJU1RFUiI7czoxOiJZIjtzOjIxOiJ+U0VORF9ORVdfVVNFUl9OT1RJRlkiO3M6MToiWSI7czoxNzoifkRFTElWRVJZX05PX0FKQVgiO3M6MToiTiI7czoxODoiflRFTVBMQVRFX0xPQ0FUSU9OIjtzOjU6InBvcHVwIjtzOjc6In5QUk9QXzEiO2E6MDp7fXM6MTU6In5QQVRIX1RPX0JBU0tFVCI7czoxNToiL3BlcnNvbmFsL2NhcnQvIjtzOjE3OiJ+UEFUSF9UT19QRVJTT05BTCI7czoxNjoiL3BlcnNvbmFsL29yZGVyLyI7czoxNjoiflBBVEhfVE9fUEFZTUVOVCI7czoyNDoiL3BlcnNvbmFsL29yZGVyL3BheW1lbnQvIjtzOjE0OiJ+UEFUSF9UT19PUkRFUiI7czoyMToiL3BlcnNvbmFsL29yZGVyL21ha2UvIjtzOjEwOiJ+U0VUX1RJVExFIjtzOjE6IlkiO3M6MjA6In5TSE9XX0FDQ09VTlRfTlVNQkVSIjtzOjE6IlkiO3M6MjA6In5ERUxJVkVSWV9OT19TRVNTSU9OIjtzOjE6IlkiO3M6MTY6In5DT01QQVRJQkxFX01PREUiO3M6MToiTiI7czoxNjoifkJBU0tFVF9QT1NJVElPTiI7czo2OiJiZWZvcmUiO3M6MjI6In5CQVNLRVRfSU1BR0VTX1NDQUxJTkciO3M6ODoiYWRhcHRpdmUiO3M6MjQ6In5TRVJWSUNFU19JTUFHRVNfU0NBTElORyI7czo4OiJhZGFwdGl2ZSI7czoxMzoiflVTRVJfQ09OU0VOVCI7czoxOiJZIjtzOjE2OiJ+VVNFUl9DT05TRU5UX0lEIjtzOjE6IjIiO3M6MjQ6In5VU0VSX0NPTlNFTlRfSVNfQ0hFQ0tFRCI7czoxOiJZIjtzOjIzOiJ+VVNFUl9DT05TRU5UX0lTX0xPQURFRCI7czoxOiJZIjtzOjExOiJ+Q0FDSEVfVFlQRSI7czoxOiJBIjtzOjEyOiJ+VVNFX1BSRUxPQUQiO3M6MToiWSI7czoxNjoifkFDVElPTl9WQVJJQUJMRSI7czoxMDoic29hLWFjdGlvbiI7czoxMjoifk5PX1BFUlNPTkFMIjtzOjE6Ik4iO3M6MTM6In5QQVRIX1RPX0FVVEgiO3M6NjoiL2F1dGgvIjtzOjE1OiJ+VVNFX1BSRVBBWU1FTlQiO3M6MToiTiI7czoxOToifkRJU1BMQVlfSU1HX0hFSUdIVCI7aTo5MDtzOjE1OiJ+U0hPV19WQVRfUFJJQ0UiO3M6MToiWSI7czoyMjoifkRFTElWRVJZX1RPX1BBWVNZU1RFTSI7czozOiJkMnAiO3M6MjQ6In5ESVNBQkxFX0JBU0tFVF9SRURJUkVDVCI7czoxOiJOIjtzOjIzOiJ+RU1QVFlfQkFTS0VUX0hJTlRfUEFUSCI7czoxOiIvIjtzOjEzOiJ+Q1VSUkVOVF9QQUdFIjtzOjMxOiIvcGVyc29uYWwvb3JkZXIvbWFrZS9pbmRleDQucGhwIjtzOjE2OiJ+SVNfTEFORElOR19TSE9QIjtzOjE6Ik4iO3M6MTk6In5BTExPV19BUFBFTkRfT1JERVIiO3M6MToiWSI7czoxODoifkFMTE9XX05FV19QUk9GSUxFIjtzOjE6IlkiO3M6MzE6In5TSE9XX05PVF9DQUxDVUxBVEVEX0RFTElWRVJJRVMiO3M6MToiWSI7czoyMzoiflNQT1RfTE9DQVRJT05fQllfR0VPSVAiO3M6MToiWSI7czoxNjoiflBST0RVQ1RfQ09MVU1OUyI7YTo1OntzOjQ6Ik5BTUUiO3M6MTY6ItCd0LDQt9Cy0LDQvdC40LUiO3M6MTU6IlBSRVZJRVdfUElDVFVSRSI7czoyMjoi0JjQt9C+0LHRgNCw0LbQtdC90LjQtSI7czo1OiJQUk9QUyI7czoxNjoi0KHQstC+0LnRgdGC0LLQsCI7czo4OiJRVUFOVElUWSI7czoyMDoi0JrQvtC70LjRh9C10YHRgtCy0L4iO3M6MzoiU1VNIjtzOjEwOiLQodGD0LzQvNCwIjt9czoyNDoiflBST0RVQ1RfQ09MVU1OU19WSVNJQkxFIjthOjI6e2k6MDtzOjE1OiJQUkVWSUVXX1BJQ1RVUkUiO2k6MTtzOjU6IlBST1BTIjt9czoyMzoiflBST0RVQ1RfQ09MVU1OU19ISURERU4iO2E6MDp7fXM6MjQ6In5VU0VfUEhPTkVfTk9STUFMSVpBVElPTiI7czoxOiJZIjtzOjE0OiJURU1QTEFURV9USEVNRSI7czowOiIiO3M6MTc6IlNIT1dfT1JERVJfQlVUVE9OIjtzOjEwOiJmaW5hbF9zdGVwIjtzOjIzOiJTSE9XX1RPVEFMX09SREVSX0JVVFRPTiI7czoxOiJOIjtzOjI2OiJTSE9XX1BBWV9TWVNURU1fTElTVF9OQU1FUyI7czoxOiJZIjtzOjI1OiJTSE9XX1BBWV9TWVNURU1fSU5GT19OQU1FIjtzOjE6IlkiO3M6MjQ6IlNIT1dfREVMSVZFUllfTElTVF9OQU1FUyI7czoxOiJZIjtzOjIzOiJTSE9XX0RFTElWRVJZX0lORk9fTkFNRSI7czoxOiJZIjtzOjI2OiJTSE9XX0RFTElWRVJZX1BBUkVOVF9OQU1FUyI7czoxOiJZIjtzOjE4OiJTSE9XX1NUT1JFU19JTUFHRVMiO3M6MToiWSI7czoxODoiU0tJUF9VU0VMRVNTX0JMT0NLIjtzOjE6IlkiO3M6MTk6IlNIT1dfQkFTS0VUX0hFQURFUlMiO3M6MToiTiI7czoyODoiREVMSVZFUllfRkFERV9FWFRSQV9TRVJWSUNFUyI7czoxOiJOIjtzOjE5OiJTSE9XX05FQVJFU1RfUElDS1VQIjtzOjE6Ik4iO3M6MTk6IkRFTElWRVJJRVNfUEVSX1BBR0UiO2k6OTtzOjIwOiJQQVlfU1lTVEVNU19QRVJfUEFHRSI7aTo5O3M6MTY6IlBJQ0tVUFNfUEVSX1BBR0UiO2k6NTtzOjE1OiJTSE9XX1BJQ0tVUF9NQVAiO3M6MToiWSI7czoxNzoiU0hPV19NQVBfSU5fUFJPUFMiO3M6MToiTiI7czoxNToiUElDS1VQX01BUF9UWVBFIjtzOjY6InlhbmRleCI7czoyMjoiSElERV9PUkRFUl9ERVNDUklQVElPTiI7czoxOiJOIjtzOjE5OiJBTExPV19VU0VSX1BST0ZJTEVTIjtzOjE6Ik4iO3M6MTI6IlNIT1dfQ09VUE9OUyI7czoxOiJZIjtzOjE5OiJTSE9XX0NPVVBPTlNfQkFTS0VUIjtzOjE6IlkiO3M6MjE6IlNIT1dfQ09VUE9OU19ERUxJVkVSWSI7czoxOiJZIjtzOjIzOiJTSE9XX0NPVVBPTlNfUEFZX1NZU1RFTSI7czoxOiJZIjtzOjEyOiJVU0VfWU1fR09BTFMiO3M6MToiTiI7czoxNjoiWU1fR09BTFNfQ09VTlRFUiI7czowOiIiO3M6MTk6IllNX0dPQUxTX0lOSVRJQUxJWkUiO3M6MTM6IkJYLW9yZGVyLWluaXQiO3M6MjA6IllNX0dPQUxTX0VESVRfUkVHSU9OIjtzOjE0OiJCWC1yZWdpb24tZWRpdCI7czoyMjoiWU1fR09BTFNfRURJVF9ERUxJVkVSWSI7czoxNjoiQlgtZGVsaXZlcnktZWRpdCI7czoyMDoiWU1fR09BTFNfRURJVF9QSUNLVVAiO3M6MTQ6IkJYLXBpY2tVcC1lZGl0IjtzOjI0OiJZTV9HT0FMU19FRElUX1BBWV9TWVNURU0iO3M6MTc6IkJYLXBheVN5c3RlbS1lZGl0IjtzOjI0OiJZTV9HT0FMU19FRElUX1BST1BFUlRJRVMiO3M6MTg6IkJYLXByb3BlcnRpZXMtZWRpdCI7czoyMDoiWU1fR09BTFNfRURJVF9CQVNLRVQiO3M6MTQ6IkJYLWJhc2tldC1lZGl0IjtzOjIwOiJZTV9HT0FMU19ORVhUX1JFR0lPTiI7czoxNDoiQlgtcmVnaW9uLW5leHQiO3M6MjI6IllNX0dPQUxTX05FWFRfREVMSVZFUlkiO3M6MTY6IkJYLWRlbGl2ZXJ5LW5leHQiO3M6MjA6IllNX0dPQUxTX05FWFRfUElDS1VQIjtzOjE0OiJCWC1waWNrVXAtbmV4dCI7czoyNDoiWU1fR09BTFNfTkVYVF9QQVlfU1lTVEVNIjtzOjE3OiJCWC1wYXlTeXN0ZW0tbmV4dCI7czoyNDoiWU1fR09BTFNfTkVYVF9QUk9QRVJUSUVTIjtzOjE4OiJCWC1wcm9wZXJ0aWVzLW5leHQiO3M6MjA6IllNX0dPQUxTX05FWFRfQkFTS0VUIjtzOjE0OiJCWC1iYXNrZXQtbmV4dCI7czoxOToiWU1fR09BTFNfU0FWRV9PUkRFUiI7czoxMzoiQlgtb3JkZXItc2F2ZSI7czoyMjoiVVNFX0VOSEFOQ0VEX0VDT01NRVJDRSI7czoxOiJOIjtzOjE1OiJEQVRBX0xBWUVSX05BTUUiO3M6OToiZGF0YUxheWVyIjtzOjE0OiJCUkFORF9QUk9QRVJUWSI7czowOiIiO3M6MjM6IlNIT1dfTUFQX0ZPUl9ERUxJVkVSSUVTIjthOjA6e31zOjIwOiJISURFX0RFVEFJTF9QQUdFX1VSTCI7czoxOiJOIjtzOjIwOiJNRVNTX0FVVEhfQkxPQ0tfTkFNRSI7czoyMjoi0JDQstGC0L7RgNC40LfQsNGG0LjRjyI7czoxOToiTUVTU19SRUdfQkxPQ0tfTkFNRSI7czoyMjoi0KDQtdCz0LjRgdGC0YDQsNGG0LjRjyI7czoyMjoiTUVTU19CQVNLRVRfQkxPQ0tfTkFNRSI7czoyODoi0KLQvtCy0LDRgNGLINCyINC30LDQutCw0LfQtSI7czoyMjoiTUVTU19SRUdJT05fQkxPQ0tfTkFNRSI7czoyOToi0KDQtdCz0LjQvtC9INC00L7RgdGC0LDQstC60LgiO3M6MjM6Ik1FU1NfUEFZTUVOVF9CTE9DS19OQU1FIjtzOjEyOiLQntC/0LvQsNGC0LAiO3M6MjQ6Ik1FU1NfREVMSVZFUllfQkxPQ0tfTkFNRSI7czoxNjoi0JTQvtGB0YLQsNCy0LrQsCI7czoyMToiTUVTU19CVVlFUl9CTE9DS19OQU1FIjtzOjIwOiLQn9C+0LrRg9C/0LDRgtC10LvRjCI7czo5OiJNRVNTX0JBQ0siO3M6MTA6ItCd0LDQt9Cw0LQiO3M6MTI6Ik1FU1NfRlVSVEhFUiI7czoxMDoi0JTQsNC70LXQtSI7czo5OiJNRVNTX0VESVQiO3M6MTY6ItC40LfQvNC10L3QuNGC0YwiO3M6MTE6In5NRVNTX09SREVSIjtzOjI3OiLQntGE0L7RgNC80LjRgtGMINC30LDQutCw0LciO3M6MTA6Ik1FU1NfT1JERVIiO3M6Mjc6ItCe0YTQvtGA0LzQuNGC0Ywg0LfQsNC60LDQtyI7czoxMDoiTUVTU19QUklDRSI7czoxODoi0KHRgtC+0LjQvNC+0YHRgtGMIjtzOjExOiJNRVNTX1BFUklPRCI7czoyNToi0KHRgNC+0Log0LTQvtGB0YLQsNCy0LrQuCI7czoxMzoiTUVTU19OQVZfQkFDSyI7czoxMDoi0J3QsNC30LDQtCI7czoxNjoiTUVTU19OQVZfRk9SV0FSRCI7czoxMjoi0JLQv9C10YDQtdC0IjtzOjE1OiJNRVNTX1BSSUNFX0ZSRUUiO3M6MTg6ItCx0LXRgdC/0LvQsNGC0L3QviI7czoxMjoiTUVTU19FQ09OT01ZIjtzOjE2OiLQrdC60L7QvdC+0LzQuNGPIjtzOjI3OiJNRVNTX1JFR0lTVFJBVElPTl9SRUZFUkVOQ0UiO3M6MjE5OiLQldGB0LvQuCDQstGLINCy0L/QtdGA0LLRi9C1INC90LAg0YHQsNC50YLQtSwg0Lgg0YXQvtGC0LjRgtC1LCDRh9GC0L7QsdGLINC80Ysg0LLQsNGBINC/0L7QvNC90LjQu9C4LCDQuCDQstGB0LUg0LLQsNGI0Lgg0LfQsNC60LDQt9GLINGB0L7RhdGA0LDQvdGP0LvQuNGB0YwsINC30LDQv9C+0LvQvdC40YLQtSDRgNC10LPQuNGB0YLRgNCw0YbQuNC+0L3QvdGD0Y4g0YTQvtGA0LzRgy4iO3M6MjE6Ik1FU1NfQVVUSF9SRUZFUkVOQ0VfMSI7czoxMjE6ItCh0LjQvNCy0L7Qu9C+0LwgItC30LLQtdC30LTQvtGH0LrQsCIgKCopINC+0YLQvNC10YfQtdC90Ysg0L7QsdGP0LfQsNGC0LXQu9GM0L3Ri9C1INC00LvRjyDQt9Cw0L/QvtC70L3QtdC90LjRjyDQv9C+0LvRjy4iO3M6MjE6Ik1FU1NfQVVUSF9SRUZFUkVOQ0VfMiI7czo5ODoi0J/QvtGB0LvQtSDRgNC10LPQuNGB0YLRgNCw0YbQuNC4INCy0Ysg0L/QvtC70YPRh9C40YLQtSDQuNC90YTQvtGA0LzQsNGG0LjQvtC90L3QvtC1INC/0LjRgdGM0LzQvi4iO3M6MjE6Ik1FU1NfQVVUSF9SRUZFUkVOQ0VfMyI7czo0Nzk6ItCb0LjRh9C90YvQtSDRgdCy0LXQtNC10L3QuNGPLCDQv9C+0LvRg9GH0LXQvdC90YvQtSDQsiDRgNCw0YHQv9C+0YDRj9C20LXQvdC40LUg0LjQvdGC0LXRgNC90LXRgi3QvNCw0LPQsNC30LjQvdCwINC/0YDQuCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4INC40LvQuCDQutCw0LrQuNC8LdC70LjQsdC+INC40L3Ri9C8INC+0LHRgNCw0LfQvtC8LCDQvdC1INCx0YPQtNGD0YIg0LHQtdC3INGA0LDQt9GA0LXRiNC10L3QuNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvQtdC5INC/0LXRgNC10LTQsNCy0LDRgtGM0YHRjyDRgtGA0LXRgtGM0LjQvCDQvtGA0LPQsNC90LjQt9Cw0YbQuNGP0Lwg0Lgg0LvQuNGG0LDQvCDQt9CwINC40YHQutC70Y7Rh9C10L3QuNC10Lwg0YHQuNGC0YPQsNGG0LjQuSwg0LrQvtCz0LTQsCDRjdGC0L7Qs9C+INGC0YDQtdCx0YPQtdGCINC30LDQutC+0L0g0LjQu9C4INGB0YPQtNC10LHQvdC+0LUg0YDQtdGI0LXQvdC40LUuIjtzOjIxOiJNRVNTX0FERElUSU9OQUxfUFJPUFMiO3M6NDU6ItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0LUg0YHQstC+0LnRgdGC0LLQsCI7czoxNToiTUVTU19VU0VfQ09VUE9OIjtzOjI5OiLQn9GA0LjQvNC10L3QuNGC0Ywg0LrRg9C/0L7QvSI7czoxMToiTUVTU19DT1VQT04iO3M6MTA6ItCa0YPQv9C+0L0iO3M6MTY6Ik1FU1NfUEVSU09OX1RZUEUiO3M6Mjk6ItCi0LjQvyDQv9C70LDRgtC10LvRjNGJ0LjQutCwIjtzOjE5OiJNRVNTX1NFTEVDVF9QUk9GSUxFIjtzOjMxOiLQktGL0LHQtdGA0LjRgtC1INC/0YDQvtGE0LjQu9GMIjtzOjIxOiJNRVNTX1JFR0lPTl9SRUZFUkVOQ0UiO3M6MjIwOiLQktGL0LHQtdGA0LjRgtC1INGB0LLQvtC5INCz0L7RgNC+0LQg0LIg0YHQv9C40YHQutC1LiDQldGB0LvQuCDQstGLINC90LUg0L3QsNGI0LvQuCDRgdCy0L7QuSDQs9C+0YDQvtC0LCDQstGL0LHQtdGA0LjRgtC1ICLQtNGA0YPQs9C+0LUg0LzQtdGB0YLQvtC/0L7Qu9C+0LbQtdC90LjQtSIsINCwINCz0L7RgNC+0LQg0LLQv9C40YjQuNGC0LUg0LIg0L/QvtC70LUgItCT0L7RgNC+0LQiIjtzOjE2OiJNRVNTX1BJQ0tVUF9MSVNUIjtzOjM0OiLQn9GD0L3QutGC0Ysg0YHQsNC80L7QstGL0LLQvtC30LA6IjtzOjI0OiJNRVNTX05FQVJFU1RfUElDS1VQX0xJU1QiO3M6MzI6ItCR0LvQuNC20LDQudGI0LjQtSDQv9GD0L3QutGC0Ys6IjtzOjE4OiJNRVNTX1NFTEVDVF9QSUNLVVAiO3M6MTQ6ItCS0YvQsdGA0LDRgtGMIjtzOjIxOiJNRVNTX0lOTkVSX1BTX0JBTEFOQ0UiO3M6NjA6ItCd0LAg0LLQsNGI0LXQvCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60L7QvCDRgdGH0LXRgtC1OiI7czoxNToiTUVTU19PUkRFUl9ERVNDIjtzOjM5OiLQmtC+0LzQvNC10L3RgtCw0YDQuNC4INC6INC30LDQutCw0LfRgzoiO3M6MjQ6Ik1FU1NfUFJFTE9BRF9PUkRFUl9USVRMRSI7TjtzOjI1OiJNRVNTX1NVQ0NFU1NfUFJFTE9BRF9URVhUIjtzOjI2MToi0JLRiyDQt9Cw0LrQsNC30YvQstCw0LvQuCDQsiDQvdCw0YjQtdC8INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L3QtSwg0L/QvtGN0YLQvtC80YMg0LzRiyDQt9Cw0L/QvtC70L3QuNC70Lgg0LLRgdC1INC00LDQvdC90YvQtSDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuC48YnIgLz4K0JXRgdC70Lgg0LLRgdC1INC30LDQv9C+0LvQvdC10L3QviDQstC10YDQvdC+LCDQvdCw0LbQvNC40YLQtSDQutC90L7Qv9C60YMgIiNPUkRFUl9CVVRUT04jIi4KIjtzOjIyOiJNRVNTX0ZBSUxfUFJFTE9BRF9URVhUIjtzOjQ1NDoi0JLRiyDQt9Cw0LrQsNC30YvQstCw0LvQuCDQsiDQvdCw0YjQtdC8INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L3QtSwg0L/QvtGN0YLQvtC80YMg0LzRiyDQt9Cw0L/QvtC70L3QuNC70Lgg0LLRgdC1INC00LDQvdC90YvQtSDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuC48YnIgLz4K0J7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1INC90LAg0YDQsNC30LLQtdGA0L3Rg9GC0YvQuSDQsdC70L7QuiDRgSDQuNC90YTQvtGA0LzQsNGG0LjQtdC5INC+INC30LDQutCw0LfQtS4g0JfQtNC10YHRjCDQstGLINC80L7QttC10YLQtSDQstC90LXRgdGC0Lgg0L3QtdC+0LHRhdC+0LTQuNC80YvQtSDQuNC30LzQtdC90LXQvdC40Y8g0LjQu9C4IArQvtGB0YLQsNCy0LjRgtGMINC60LDQuiDQtdGB0YLRjCDQuCDQvdCw0LbQsNGC0Ywg0LrQvdC+0L/QutGDICIjT1JERVJfQlVUVE9OIyIuCiI7czozMDoiTUVTU19ERUxJVkVSWV9DQUxDX0VSUk9SX1RJVExFIjtzOjc3OiLQndC1INGD0LTQsNC70L7RgdGMINGA0LDRgdGB0YfQuNGC0LDRgtGMINGB0YLQvtC40LzQvtGB0YLRjCDQtNC+0YHRgtCw0LLQutC4LiI7czoyOToiTUVTU19ERUxJVkVSWV9DQUxDX0VSUk9SX1RFWFQiO3M6MjIxOiLQktGLINC80L7QttC10YLQtSDQv9GA0L7QtNC+0LvQttC40YLRjCDQvtGE0L7RgNC80LvQtdC90LjQtSDQt9Cw0LrQsNC30LAsINCwINGH0YPRgtGMINC/0L7Qt9C20LUg0LzQtdC90LXQtNC20LXRgCDQvNCw0LPQsNC30LjQvdCwINGB0LLRj9C20LXRgtGB0Y8g0YEg0LLQsNC80Lgg0Lgg0YPRgtC+0YfQvdC40YIg0LjQvdGE0L7RgNC80LDRhtC40Y4g0L/QviDQtNC+0YHRgtCw0LLQutC1LiI7czoyOToiTUVTU19QQVlfU1lTVEVNX1BBWUFCTEVfRVJST1IiO3M6NDE4OiLQktGLINGB0LzQvtC20LXRgtC1INC+0L/Qu9Cw0YLQuNGC0Ywg0LfQsNC60LDQtyDQv9C+0YHQu9C1INGC0L7Qs9C+LCDQutCw0Log0LzQtdC90LXQtNC20LXRgCDQv9GA0L7QstC10YDQuNGCINC90LDQu9C40YfQuNC1INC/0L7Qu9C90L7Qs9C+INC60L7QvNC/0LvQtdC60YLQsCDRgtC+0LLQsNGA0L7QsiDQvdCwINGB0LrQu9Cw0LTQtS4g0KHRgNCw0LfRgyDQv9C+0YHQu9C1INC/0YDQvtCy0LXRgNC60Lgg0LLRiyDQv9C+0LvRg9GH0LjRgtC1INC/0LjRgdGM0LzQviDRgSDQuNC90YHRgtGA0YPQutGG0LjRj9C80Lgg0L/QviDQvtC/0LvQsNGC0LUuINCe0L/Qu9Cw0YLQuNGC0Ywg0LfQsNC60LDQtyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LIg0L/QtdGA0YHQvtC90LDQu9GM0L3QvtC8INGA0LDQt9C00LXQu9C1INGB0LDQudGC0LAuIjt9.df6f424f0972b4ef482c2819c94659d9bad9ada6e16e748b512622e30fc22cbe',
          'soa-action': 'refreshOrderAjax',
    },
  
    OPEN_SOURCE_ORDER_TEMPLATE_PROPERTIES_TITLE: 'Свойства заказа:',
    OPEN_SOURCE_ORDER_TEMPLATE_DELIVERIES_TITLE: 'Службы доставки:',
    OPEN_SOURCE_ORDER_TEMPLATE_PAY_SYSTEMS_TITLE: 'Платежные системы:',
    OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TITLE: 'Состав заказа',
    OPEN_SOURCE_ORDER_TEMPLATE_BASKET_NAME_COLUMN: 'Название',
    OPEN_SOURCE_ORDER_TEMPLATE_BASKET_COUNT_COLUMN: 'Количество',
    OPEN_SOURCE_ORDER_TEMPLATE_BASKET_UNIT_PRICE_COLUMN: 'Цена за штуку',
    OPEN_SOURCE_ORDER_TEMPLATE_BASKET_DISCOUNT_COLUMN: 'Цена со скидкой',
    OPEN_SOURCE_ORDER_TEMPLATE_BASKET_TOTAL_COLUMN: 'Итого',
    OPEN_SOURCE_ORDER_TEMPLATE_ORDER_TOTAL_TITLE: 'Итоговые цифры',
    OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICES_TITLE: 'Цены товаров',
    OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_BASE_PRICE: 'Стоимость товаров без скидок',
    OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_PRICE: 'Стоимость товаров со скидками',
    OPEN_SOURCE_ORDER_TEMPLATE_PRODUCTS_DISCOUNT: 'Скидка на товары',
    OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICES_TITLE: 'Стоимость доставки',
    OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_BASE_PRICE: 'Стоимость доставки без учета скидок',
    OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_PRICE: 'Стоимость доставки со скидками',
    OPEN_SOURCE_ORDER_TEMPLATE_DELIVERY_DISCOUNT: 'Скидка на доставку',
    OPEN_SOURCE_ORDER_TEMPLATE_SUM_TITLE: 'Заказ целиком',
    OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_BASE_PRICE: 'Общая цена без скидок',
    OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_DISCOUNT: 'Общая скидка',
    OPEN_SOURCE_ORDER_TEMPLATE_TOTAL_PRICE: 'К оплате',
    OPEN_SOURCE_ORDER_TEMPLATE_MAKE_ORDER_BUTTON: 'Оформить заказ',
  });
	twpxordermake.run();
</script>
