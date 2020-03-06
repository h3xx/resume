#!/usr/bin/perl -w
use strict;
require Image::Imlib2;
require Text::QRCode;

use constant OUT => '../images/qrcode.png';
use constant FONT_PATH => "$ENV{HOME}/.fonts/microsoft";

# how many image pixels each pixel of the qrcode is
use constant QR_PIXEL_DIM => 6;
# how many image pixels to pad the qrcode in
use constant PADDING => 8;
use constant T_PADDING => 3;
use constant URL => 'https://h3xx.github.io/resume';

sub qrcode_image {
    my %opts = (
        size => 1,
        text => 'hello world',
        padding => 0,
        t_padding => 0,
        # (RGBA)
        background => [255, 255, 255, 255],
        caption => undef,
        font_size => 10,
        @_,
    );
    my $rows = Text::QRCode->new()->plot($opts{text});
    my $qrcode_h = scalar @{$rows};
    my $h = $qrcode_h * $opts{size} + $opts{padding} * 2;
    my $w = $qrcode_h * $opts{size} + $opts{padding} * 2;

    if ($opts{caption}) {
        my $temp = Image::Imlib2->new($w, $h);
        $temp->add_font_path(FONT_PATH);
        $temp->load_font("arial/$opts{font_size}");
        my ($t_sz_x, $t_sz_y) = $temp->get_text_size($opts{caption});
        $h += $t_sz_y + $opts{t_padding};
    }

    my $qi = Image::Imlib2->new($w, $h);

    # color bg white
    $qi->set_color(255,255,255,255);
    $qi->fill_rectangle(0, 0, $w, $h);

    if ($opts{caption}) {
        $qi->set_color(0,0,0,255);
        $qi->add_font_path(FONT_PATH);
        $qi->load_font("arial/$opts{font_size}");
        my ($t_sz_x, $t_sz_y) = $qi->get_text_size($opts{caption});
        if ($t_sz_x > $w - $opts{padding}*2) {
            my $nc = ($opts{caption} =~ m#://(.*?)$#);
            warn "Trimming caption `$opts{caption}` -> `$nc`";
            $opts{caption} = $nc;
        }
        # centered
        $qi->draw_text(
            ($w - $t_sz_x) / 2,
            # note: fudged this calculation a little; t_padding*2 looked better than t_padding
            $opts{size} * $qrcode_h + $opts{padding} + $opts{t_padding} * 2,
            $opts{caption},
        );
    }

    foreach my $row_idx (0 .. $#{$rows}) {
        my $row = $rows->[$row_idx];
        foreach my $col_idx (0 .. $#{$row}) {
            if ($row->[$col_idx] eq '*') {
                # black
                $qi->set_color(0,0,0,255);
            } else {
                # white
                $qi->set_color(255,255,255,255);
            }
            $qi->fill_rectangle(
                $col_idx * $opts{size} + $opts{padding},
                $row_idx * $opts{size} + $opts{padding},
                $opts{size},
                $opts{size},
            );
        }
    }

    return $qi;
}

&qrcode_image(
    text => URL,
    size => QR_PIXEL_DIM,
    padding => PADDING,
    t_padding => T_PADDING,
    caption => (URL =~ m#://(.*?)$#),
    font_size => 10,
)->save(OUT);

# vi: ts=4 sts=4 sw=4 et
