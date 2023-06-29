export class EditMovieRequest {
    constructor(
        watchlist,
        title,
        description,
        show_date,
        time_show_date,
        close_date,
        time_close_date,
        active,
        titleNoti,
        summaryNoti,
        image
    ) {
        this.watchlist = watchlist;
        this.title = title;
        this.description = description;
        this.show_date = show_date;
        this.time_show_date = time_show_date;
        this.close_date = close_date;
        this.time_close_date = time_close_date;
        this.active = active;
        this.titleNoti = titleNoti;
        this.summaryNoti = summaryNoti;
        this.image = image;
    }
}
