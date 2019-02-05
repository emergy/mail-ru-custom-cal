$(document).ready(function()
{
    // Показать выходные, если не активно
    if ($('.fc-weekend-button').text() == 'Show weekends') {
        $('.fc-weekend-button').click();
        $('.fc-weekend-button').hide();

        decoration();
    } else {
        decoration();
    }

    // Действие при нажатии кнопок смены месяца
    $('.fc-button').click(function() {
        decoration();
    });
});

function decoration() {
    // Ожидаем немного времени прогрузки контента
    setTimeout(function(){
        // Если не успело прогрузиться, повторяем
        if ( $('.jira-page-loading-indicator').length ) {
            decoration();
        } else {
            // Убирем номера тикетов
            /*
            $('.fc-title').each(function() {
                $(this).text( $(this).text().replace(/MTDUTY-\d+/, '') );
            });
            */

            // Новая строка между статусами и именами
            /*
            $('.jira-issue-status-lozenge').each(function() {
                $(this).after('<br />');
            });
            */

            // Выделяем черным фоном и жирным текстом собстенную фамилию
			chrome.storage.sync.get(['lastname'], function(result) {
                if (result.lastname.length > 0) {
                    $(".fc-title:contains(" + result.lastname + ")").each(function() {
                        $(this).css("font-weight", "600");
                        $(this).parent().parent().css("background-color", "#000000");
                    });
                }
			});

            // Убираем номера недели
            $('.fc-week-number').each(function() {
                $(this).hide();
            });

            // Делаем полупрозрачними всё кроме дежурств
            $('.jira-issue-status-lozenge').each(function() {
                if ($(this).text() != 'Open' && $(this).text() != 'Нужен отгул' && $(this).text() != 'Отгул назначен') {
                    $(this).parent().parent().parent().fadeTo(200, 0.2);

                    $(this).parent().parent().parent().mouseenter(function() {
                        $(this).fadeTo(200, 1);
                    });

                    $(this).parent().parent().parent().mouseleave(function() {
                        $(this).fadeTo(200, 0.2);
                    });
                }
            });
        }
    }, 50);
}
